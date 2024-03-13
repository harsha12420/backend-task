"use strict";

import { HttpCodes } from "../helpers/responseCodes";
import commonHelper from "../helpers/CommonController";
import { Op } from "sequelize";
import moment from "moment";

const {
	getEpoch,
	covertDatetoEpoch
} = new commonHelper();
const models = require('./../models/index');

export default class SystemService {

	constructor() {

		this.getInventoryList = this.getInventoryList.bind(this);
		this.addSystem = this.addSystem.bind(this);
		this.getAllSystem = this.getAllSystem.bind(this);
		this.deleteSystem = this.deleteSystem.bind(this);
		this.systemCount = this.systemCount.bind(this);
		this.getSystemById = this.getSystemById.bind(this);
		this.updateSystem = this.updateSystem.bind(this);
		this.assignSystemtoUser = this.assignSystemtoUser.bind(this);
		this.getSystemHistory = this.getSystemHistory.bind(this);
	}


	async getInventoryList(params, callback) {
		try {
			let filter = {
				where: {
					vAssetType: params.name,
				},
				include: [
					{
						model: models.Inventory,
						where: {
							iSystemId: null,
							vAssetUser: null,
							bIsRepair: 0,
							bIsTrash: 0,
							[Op.or]: [
								{ tiDeletedAt: { [Op.eq]: null } },
								{ tiDeletedAt: { [Op.eq]: 0 } },
							],
						},
						attributes: ['iInventoryId', 'iAssetType', 'vAssetName'],	
					}
				]
			};

			let asset = await models.Asset.findOne(filter);
			if (asset && asset.Inventories && asset.Inventories.length > 0) {
				const inventoryData = asset.Inventories.map(inventory => ({
				  iInventoryId: inventory.iInventoryId,
				  iAssetType: inventory.iAssetType,
				  vAssetName: inventory.vAssetName,
				}));
				return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'APISuccess', code: HttpCodes['OK'], data: inventoryData });
			} else {
				return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'APISuccess', code: HttpCodes['NOT_FOUND'], data: {} });
			}
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomethingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async addSystem(body, callback) {
		try {
			let systemName = body.system_name;
			let data = body;
			delete data.system_name;
			delete data.currentUserId;
			delete data.vEmployeeId;
			let bulkInsertArray = [];
			if (Object.keys(data).length !== 0) {
				let system = models.System.build({
					vSystemName: systemName,
					vSystemAssignStartDate: await getEpoch(),
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch()
				})

				let addSystem = await system.save();
				for (const key in data) {
					await models.Inventory.update({ iSystemId: addSystem.iSystemId, iUpdatedAt: await getEpoch() },
						{ where: { iInventoryId: data[key] } }
					);
				}

				return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'SystemAddedSuccess', code: HttpCodes['OK'] });
			} else {
				return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SelectInventoy', code: HttpCodes['NOT_FOUND'] });
			}
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	// 	try {
	// 	  const offset = (Number(page) - 1) * Number(limit);
	// 	  let whereCondition: any = { tiDeletedAt: { [Op.or]: [null, 0] } };
	  
	// 	  if (hasAssetUser !== undefined) {
	// 		if (hasAssetUser) {
	// 		  // When hasAssetUser is true, filter for non-null vEmployeeId
	// 		  whereCondition['vEmployeeId'] = { [Op.not]: null };
	// 		} else {
	// 		  // When hasAssetUser is false, filter for null vEmployeeId
	// 		  whereCondition['vEmployeeId'] = null;
	// 		}
	// 	  }
	  
	// 	  const totalCount = await models.System.count({
	// 		include: [
	// 		  {
	// 			model: models.UserDetails,
	// 		  },
	// 		],
	// 		where: whereCondition,
	// 	  });
	  
	// 	  const system = await models.System.findAll({
	// 		include: [
	// 		  {
	// 			model: models.UserDetails,
	// 		  },
	// 		],
	// 		where: whereCondition,
	// 		offset,
	// 		limit: Number(limit),
	// 		order: [['vSystemName', 'asc']],
	// 	  });
	  
	// 	  if (system.length === 0) {
	// 		return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetSystemData", code: HttpCodes["OK"], data: system });
	// 	  }
	  
	// 	  return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetSystemData", code: HttpCodes["OK"], data: { totalCount, paginatedSystem: system } });
	// 	} catch (error) {
	// 	  console.log(error, "error");
	  
	// 	  return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
	// 	}
	//   }	  
	
	async getAllSystem(page: string, limit: string, hasAssetUserParam: string | undefined, callback: any) {
		try {
		  const offset = (Number(page) - 1) * Number(limit);
		  let whereCondition: any = { tiDeletedAt: { [Op.or]: [null, 0] } };
	  
		  if (hasAssetUserParam === "true") {
			// When hasAssetUser is true, filter for non-null vEmployeeId
			whereCondition['vEmployeeId'] = { [Op.not]: null };
		  } else if (hasAssetUserParam === "false") {
			// When hasAssetUser is false, filter for null vEmployeeId
			whereCondition['vEmployeeId'] = null;
		  }
	  
		  const totalCount = await models.System.count({
			include: [
			  {
				model: models.UserDetails,
			  },
			],
			where: whereCondition,
		  });
	  
		  const system = await models.System.findAll({
			include: [
			  {
				model: models.UserDetails,
			  },
			],
			where: whereCondition,
			offset,
			limit: Number(limit),
			order: [['vSystemName', 'asc']],
		  });
	  
		  if (system.length === 0) {
			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetSystemData", code: HttpCodes["OK"], data: system });
		  }
		  return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetSystemData", code: HttpCodes["OK"], data: { totalCount, paginatedSystem: system } });
		} catch (error) {
		  console.log(error, "error");
	  
		  return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	  }
	  

	async getSystemById(params: any, callback: any) {
		try {
			const system = await models.System.findOne({
				where: { iSystemId: params.iSystemId },
				include: [
					{
						model: models.UserDetails,
					},
					{
						model: models.Inventory,
					},
				],
			});

			if (!system || system.tiDeletedAt === 1) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SystemNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
			}

			if (system.tiDeletedAt === null) {
				// Retrieve all associated inventory records for the system
				const inventories = await models.Inventory.findAll({
					where: { iSystemId: params.iSystemId },
				});

				system.setDataValue("inventories", inventories);

				return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetSystemById", code: HttpCodes["OK"], data: system });
			} else {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SystemNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
			}
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async deleteSystem(params: any, callback: any) {
		const updatedAt = await getEpoch();
		try {
			const system = await models.System.findByPk(params.iSystemId);

			if (!system) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SystemNotFound", code: HttpCodes["NOT_FOUND"], data: {} });
			}

			const assignedInventories = await models.Inventory.findAll({ where: { iSystemId: params.iSystemId } });

			for (const inventory of assignedInventories) {
				await models.Inventory.update(
					{
						iSystemId: null,
						vAssetUser: null,
						dtUpdatedAt: moment().tz('Asia/Kolkata').format(),
					},
					{ where: { iInventoryId: inventory.iInventoryId } }
				);

				await models.InventoryHistory.create({
					iInventoryId: inventory.iInventoryId,
					vEmployeeId: inventory.vAssetUser,
					iInventoryDate: updatedAt,
					tiInventoryFlag: 0,
					iCreatedAt: updatedAt,
					iUpdatedAt: updatedAt,
				});
			}

			await models.SystemHistory.create({
				iSystemId: system.iSystemId,
				vEmployeeId: system.vEmployeeId,
				iSystemDate: updatedAt,
				tiSystemFlag: 0,
				iCreatedAt: updatedAt,
				iUpdatedAt: updatedAt,
			});
			await models.System.update({ tiDeletedAt: 1, vEmployeeId: null, iUpdatedAt: updatedAt }, { where: { iSystemId: params.iSystemId } });

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "deleteSystem", code: HttpCodes["OK"] });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "FailedToDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async systemCount(body: any, callback: any) {
		try {
			const totalSystem = await models.System.count({
				where: {
					tiDeletedAt: {
						[models.Sequelize.Op.or]: [null, 0], // Include System with tiDeletedAt null or 0
					},
				},
			});

			const totalAssignedSystem = await models.System.count({
				where: {
					vEmployeeId: {
						[models.Sequelize.Op.not]: null,
					},
				},

			});

			const totalUnassignedSystem = totalSystem - totalAssignedSystem;

			return callback(null, {
				status: HttpCodes["API_SUCCESS"],
				msg: "DashboardData",
				code: HttpCodes["OK"],
				data: {
					totalSystem,
					totalAssignedSystem,
					totalUnassignedSystem,
				},
			});
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async getSystemHistory(body, params, callback) {
		try {
			let filter = {};
			filter['where'] = { iSystemId: params.iSystemId };
			filter['include'] = [
				{
					model: models.UserDetails
				}
			]
			filter['order'] = [['iSystemHistoryId', 'DESC']];

			let systemHistory = await models.SystemHistory.findAll(filter);
			if (systemHistory) {
				return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'APISuccess', code: HttpCodes['OK'], data: systemHistory });
			} else {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
			}
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async unassignSystem(body, callback) {
		const createdAt = await getEpoch();
		try {
			const { iSystemId, vSystemUserId } = body;
			const inventoryItems = await models.Inventory.findAll({ where: { iSystemId: iSystemId } });

			await models.System.update(
				{ vEmployeeId: null, iUpdatedAt: await getEpoch() },
				{ where: { iSystemId: iSystemId } }
			);

			await models.Inventory.update(
				{ vAssetUser: null, dtUpdatedAt: new Date() },
				{ where: { iSystemId: iSystemId } }
			);

			models.SystemHistory.create({
				iSystemId: iSystemId,
				vEmployeeId: vSystemUserId,
				iSystemDate: createdAt,
				tiSystemFlag: 0,
				iCreatedAt: createdAt,
				iUpdatedAt: createdAt,
			});

			for (const inventoryItem of inventoryItems) {
				const inventoryId = inventoryItem.iInventoryId;

				await models.InventoryHistory.create({
					iInventoryId: inventoryId,
					vEmployeeId: vSystemUserId,
					iInventoryDate: createdAt,
					tiInventoryFlag: 0,
					iCreatedAt: createdAt,
					iUpdatedAt: createdAt,
				});
			}

			return callback(null, { status: HttpCodes['API_SUCCESS'], msg: 'SystemUnassignSuccess', code: HttpCodes['OK'] });
		} catch (error) {
			return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: {} });
		}
	}

	async assignSystemtoUser(body, callback) {
		try {
		  let updatedSystem = await models.System.update(
			{ vEmployeeId: body.vSystemUserId, iUpdatedAt: await getEpoch() },
			{ where: { iSystemId: body.iSystemId } }
		  );
		  await models.Inventory.update(
			{ vAssetUser: body.vSystemUserId, dtUpdatedAt: new Date() },
			{ where: { iSystemId: body.iSystemId } }
		  );
	  
		  let updatedInventoryItems = await models.Inventory.findAll({
			where: { iSystemId: body.iSystemId },
		  });
	  
		  if (!body.comment) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "CommentIsRequired", code: HttpCodes["BAD_REQUEST"], data: {} });
		  }
	  
		  if (body.startDate) {
			let assignHistory = models.SystemHistory.build({
			  iSystemId: body.iSystemId,
			  vEmployeeId: body.vSystemUserId,
			  iSystemDate: await covertDatetoEpoch(body.startDate),
			  tiSystemFlag: 1,
			  vAssignComment: body.comment,
			  iCreatedAt: await getEpoch(),
			  iUpdatedAt: await getEpoch(),
			});
			await assignHistory.save();
	  
			let system = await models.System.findByPk(body.iSystemId);
			system.vAssignComment = body.comment;
			await system.save();
	  
			for (let i = 0; i < updatedInventoryItems.length; i++) {
			  let inventoryHistory = models.InventoryHistory.build({
				iInventoryId: updatedInventoryItems[i].iInventoryId,
				vEmployeeId: body.vSystemUserId,
				iInventoryDate: await covertDatetoEpoch(body.startDate),
				tiInventoryFlag: 1,
				vAssignComment: body.comment,
				iCreatedAt: await getEpoch(),
				iUpdatedAt: await getEpoch(),
			  });
			  await inventoryHistory.save();
	  
			  updatedInventoryItems[i].vAssignComment = body.comment;
			  await updatedInventoryItems[i].save();
			}
		  }
	  
		  if (body.endDate) {
			let unassignHistory = models.SystemHistory.build({
			  iSystemId: body.iSystemId,
			  vEmployeeId: body.vSystemUserId,
			  iSystemDate: await covertDatetoEpoch(body.endDate),
			  tiSystemFlag: 0,
			  vAssignComment: body.comment,
			  iCreatedAt: await getEpoch(),
			  iUpdatedAt: await getEpoch(),
			});
			await unassignHistory.save();
	  
			for (let i = 0; i < updatedInventoryItems.length; i++) {
			  let inventoryHistory = models.InventoryHistory.build({
				iInventoryId: updatedInventoryItems[i].iInventoryId,
				vEmployeeId: body.vSystemUserId,
				iInventoryDate: await covertDatetoEpoch(body.endDate),
				tiInventoryFlag: 0,
				vAssignComment: body.comment,
				iCreatedAt: await getEpoch(),
				iUpdatedAt: await getEpoch(),
			  });
			  await inventoryHistory.save();
	  
			  updatedInventoryItems[i].vAssignComment = body.comment;
			  await updatedInventoryItems[i].save();
			}
		  }
	  
		  return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "SystemAssignToUser", code: HttpCodes["OK"] });
		} catch (error) {
		  return callback(null, { status: HttpCodes["API_FAILURE"],	msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	  }
	  

	async updateSystem(params, body, callback) {
		const createdAt = await getEpoch();
		try {
		  const systemName = body.system_name;
		  const unassignInventory = body.removedInventories;
		  const assignInventory = body.newAddedInventories;
		  const inventoryData = { ...body };
		  delete inventoryData.system_name;
		  delete inventoryData.currentUserId;
		  delete inventoryData.vEmployeeId;
		  inventoryData.dtUpdatedAt = createdAt;
	  
		  const system = await models.System.findByPk(params.iSystemId);
		  if (!system) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SystemNotFound", code: HttpCodes["NOT_FOUND"] });
		  }
	  
		  const existingInventories = await models.Inventory.findAll({
			where: {
			  iSystemId: params.iSystemId,
			},
		  });
	  
		  for (const inventory of existingInventories) {
			const inventoryId = inventory.iInventoryId.toString();

			const isInventoryRemoved = unassignInventory.includes(Number(inventoryId));
			if (isInventoryRemoved) {
			  await models.Inventory.update(
				{
				  iSystemId: null,
				  vAssetUser: null,
				  dtUpdatedAt: moment().tz('Asia/Kolkata').format(),
				},
				{
				  where: { iInventoryId: inventoryId },
				}
			  );
	  
			  await models.InventoryHistory.create({
				iInventoryId: inventoryId,
				vEmployeeId: system.vEmployeeId,
				iInventoryDate: createdAt,
				tiInventoryFlag: 0,
				iCreatedAt: createdAt,
				iUpdatedAt: createdAt,
			  });
			}
		  }
	  
		  await models.System.update(
			{
			  vSystemName: systemName,
			  iUpdatedAt: inventoryData.dtUpdatedAt,
			},
			{
			  where: { iSystemId: params.iSystemId },
			}
		  );
	  
		  const updatedSystem = await models.System.findByPk(params.iSystemId);
		  for (const inventoryId of assignInventory) {
			const inventory = await models.Inventory.findByPk(inventoryId);
			if (inventory && inventory.iSystemId !== params.iSystemId) {
			  await models.Inventory.update(
				{
				  iSystemId: params.iSystemId,
				  vAssetUser: updatedSystem.vEmployeeId,
				  dtUpdatedAt: moment().tz('Asia/Kolkata').format(),
				},
				{
				  where: { iInventoryId: inventoryId },
				}
			  );
	  
			  await models.InventoryHistory.create({
				iInventoryId: inventoryId,
				vEmployeeId: system.vEmployeeId,
				iInventoryDate: createdAt,
				tiInventoryFlag: 1,
				iCreatedAt: createdAt,
				iUpdatedAt: createdAt,
			  });
			}
		  }
	  
		  return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "SystemAndInventoryUpdated", code: HttpCodes["OK"] });
		} catch (error) {
		  return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	  }
	  





}

