"use strict";

const models = require("./../models/index");
import moment from "moment-timezone";
import commonHelper from "../helpers/CommonController";
import { HttpCodes } from "../helpers/responseCodes";
import { Op } from "sequelize";
var sequelize = require("sequelize");

const {
	getEpoch,
	covertDatetoEpoch
} = new commonHelper();

export default class InventoryService {
	constructor() {
		this.addInventory = this.addInventory.bind(this);
		this.getAllInventory = this.getAllInventory.bind(this);
		this.getInventoryById = this.getInventoryById.bind(this);
		this.updateInventory = this.updateInventory.bind(this);
		this.deleteInventory = this.deleteInventory.bind(this);
		this.prepareDashboard = this.prepareDashboard.bind(this);
		this.assignInventorytoUser = this.assignInventorytoUser.bind(this);
		this.unassignInventory = this.unassignInventory.bind(this);
		this.getInventoryHistory = this.getInventoryHistory.bind(this);
	}

	async addInventory(body: any, callback: any) {
		try {
			// Add the dtCreatedAt & dtDeletedAt field with the current timestamp in the specified timezone
			body.dtCreatedAt = moment().tz('Asia/Kolkata').format();
			body.dtUpdatedAt = moment().tz('Asia/Kolkata').format();

			const bill = await models.Bill.findOne({
				where: {
					vBillNo: body.vBillNo,
				},
			});

			if (!bill) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "InvalidBillNo", code: HttpCodes["BAD_REQUEST"], data: {} });
			}

			let asset = models.Inventory.build(body);
			let item = await asset.save();
			return callback(null, {
				status: HttpCodes["API_SUCCESS"],
				msg: "AddInventorySuccess",
				code: HttpCodes["OK"],
				data: item,
			});
		} catch (error) {
			return callback(null, {
				status: HttpCodes["API_FAILURE"],
				msg: "SomeThingWentWrong",
				code: HttpCodes["BAD_REQUEST"],
				data: {},
			});
		}
	}

	async getAllInventory(page: string, limit: string, search: string, selectedFilter: any, iAssetType: any, callback: any) {
		try {
			const offset = (Number(page) - 1) * Number(limit);
			let filter = {
				tiDeletedAt: { [models.Sequelize.Op.or]: [null, 0] },
			};

			if (selectedFilter === 'Repair') {
				filter['bIsRepair'] = true;
				filter['bIsTrash'] = false;
			} else if (selectedFilter === 'Unassigned') {
				filter['bIsRepair'] = false;
				filter['bIsTrash'] = false;
				filter['iSystemId'] = null;
				filter['vAssetUser'] = null;
			} else if (selectedFilter === 'Trash') {
				filter['bIsTrash'] = true
			} else if (selectedFilter === 'Assigned') {
				filter['bIsRepair'] = false;
				filter['bIsTrash'] = false,
					filter[Op.or] = [
						{ iSystemId: { [Op.ne]: null } },
						{ vAssetUser: { [Op.ne]: null } },
					]
			}

			if (iAssetType) {
				filter['iAssetType'] = iAssetType;
			}
	

			if (search) {
				filter[Op.or] =
					[
						{ '$UserDetail.vFirstName$': { [Op.like]: `%${search}%` } },
						{ '$UserDetail.vLastName$': { [Op.like]: `%${search}%` } },
						{ '$Asset.vAssetType$': { [Op.like]: `%${search}%` } }, 
						sequelize.literal(`CONCAT(vFirstName, ' ', vLastName) LIKE '%${search}%'`), // Corrected line
						{ vBillNo: { [Op.like]: `%${search}%` } },
						{ vAssetName: { [Op.like]: `%${search}%` } },
						{ iInventoryId: { [Op.like]: `%${search}%` } }
					]
			}

			const totalCount = await models.Inventory.count({
				include: [
					{
						model: models.UserDetails
					},
					{
						model: models.Asset
					},
				],
				where: filter,
			});

			const inventoryData = await models.Inventory.findAll({
				include: [
					{
						model: models.UserDetails,
						attributes: [[sequelize.literal(`CONCAT(vFirstName, ' ', vLastName)`), 'full_name']]
					},
					{
						model: models.Asset
					},
				],
				where: filter
			});

			const inventory = await models.Inventory.findAll({
				include: [
					{
						model: models.UserDetails
					},
					{
						model: models.Asset
					},
				],
				where: filter,
				offset,
				limit: Number(limit),
			});

			if (inventory.length === 0) {
				return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetInventoryData", code: HttpCodes["OK"], data: inventory });
			}

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetInventoryData", code: HttpCodes["OK"], data: { totalCount, paginatedInventory: inventory, inventory: inventoryData } });
		} catch (error) {
			console.log(error, "eroor===")
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async getInventoryById(params: any, callback: any) {
		try {
			const inventory = await models.Inventory.findOne({
				where: { iInventoryId: params.iInventoryId },
				include: [
					{
						model: models.Bill
					},
					{
						model: models.Asset
					},
					{
						model: models.UserDetails
					}

				],
			});

			if (!inventory) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "InventoryNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
			}

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetInventoryById", code: HttpCodes["OK"], data: inventory });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async updateInventory(params, body, callback) {
		try {
			body.dtUpdatedAt = moment().tz('Asia/Kolkata').format();
			body.bIsRepair = body.bIsRepair === "true";
			body.bIsTrash = body.bIsTrash === "true";

			const inventory = await models.Inventory.findByPk(params.iInventoryId);

			if (!inventory) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "InventoryNotFound", code: HttpCodes["NOT_FOUND"], data: {} });
			}

			const userId = inventory.vAssetUser;

			if (body.bIsRepair) {
				if (!body.vRepairComment) {
					return callback(null, { status: HttpCodes["API_FAILURE"], msg: "CommentIsRequired", code: HttpCodes["BAD_REQUEST"], data: {} });
				}

				body.iSystemId = null;
				body.vAssetUser = null;
				body.bIsRepair = 1;

				const repair = await models.InventoryHistory.create({
					iInventoryId: params.iInventoryId,
					vEmployeeId: userId,
					iInventoryDate: await getEpoch(),
					tiInventoryFlag: 2,
					vRepairComment: body.vRepairComment,
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch(),
				});

			}

			if (body.bIsTrash) {
				body.iSystemId = null;
				body.vAssetUser = null;
				body.bIsTrash = 1;

				const trash = await models.InventoryHistory.create({
					iInventoryId: params.iInventoryId,
					vEmployeeId: userId,
					iInventoryDate: await getEpoch(),
					tiInventoryFlag: 3,
					vRepairComment: body.vRepairComment,
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch(),
				});
			}

			await inventory.update(body);
			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "UpdateInventory", code: HttpCodes["OK"] });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}


	async deleteInventory(params: any, callback: any) {
		const createdAt = await getEpoch();
		try {
			const inventoryId = params.iInventoryId;
			const inventory = await models.Inventory.findByPk(inventoryId);

			if (!inventory) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "InventoryNotFound", code: HttpCodes["NOT_FOUND"], data: {} });
			}

			if (inventory.tiDeletedAt === 1) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "InventoryAlreadyDeleted", code: HttpCodes["BAD_REQUEST"], data: {} });
			}

			if (inventory.iSystemId !== null && inventory.iSystemId !== 0) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "CannotDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
			}

			models.Inventory.update(
				{
					vAssetUser: null,
					tiDeletedAt: 1,
					dtUpdatedAt: moment().tz('Asia/Kolkata').format(),
				},
				{ where: { iInventoryId: inventoryId } }
			);

			models.InventoryHistory.create({
				iInventoryId: inventoryId,
				vEmployeeId: inventory.vAssetUser,
				iInventoryDate: createdAt,
				tiInventoryFlag: 0,
				iCreatedAt: createdAt,
				iUpdatedAt: createdAt,
			});

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "deleteInventory", code: HttpCodes["OK"] });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "FailedToDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async prepareDashboard(body: any, callback: any) {
		try {
			const totalAssets = await models.Inventory.count({
				where: {
					tiDeletedAt: {
						[models.Sequelize.Op.or]: [null, 0], // Include assets with tiDeletedAt null or 0
					},
					bIsTrash: false,
				},
			});

			const totalAssignedAssets = await models.Inventory.count({
				where: {
					vAssetUser: {
						[models.Sequelize.Op.not]: null,
					},
					tiDeletedAt: {
						[models.Sequelize.Op.or]: [null, 0], // Include assets with tiDeletedAt null or 0
					},
					bIsTrash: false,
				},
			});

			const totalUnassignedAssets = totalAssets - totalAssignedAssets;

			return callback(null, {
				status: HttpCodes["API_SUCCESS"],
				msg: "DashboardData",
				code: HttpCodes["OK"],
				data: {
					totalAssets,
					totalAssignedAssets,
					totalUnassignedAssets,
				},
			});
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async assignInventorytoUser(body, callback) {
		try {
			body.dtUpdatedAt = moment().tz('Asia/Kolkata').format();
			let updatedInventory;

			const existingInventory = await models.Inventory.findOne({
				where: { iInventoryId: body.iInventoryId },
			});

			if (!existingInventory) {
				return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'InventoryNotFound', code: HttpCodes['NOT_FOUND'], data: {} });
			}

			if (existingInventory.iSystemId !== null) {
				return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'InventoryAlreadyAssigned', code: HttpCodes['BAD_REQUEST'], data: {} });
			}

			if (!body.comment) {
				return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'CommentIsRequired', code: HttpCodes['BAD_REQUEST'], data: {} });
			}

			updatedInventory = await models.Inventory.update(
				{ vAssetUser: body.vInventoryUserId, dtUpdatedAt: body.dtUpdatedAt },
				{ where: { iInventoryId: body.iInventoryId } }
			);

			if (body.startDate) {
				let assignHistory = models.InventoryHistory.build({
					iInventoryId: body.iInventoryId,
					vEmployeeId: body.vInventoryUserId,
					iInventoryDate: await covertDatetoEpoch(body.startDate),
					tiInventoryFlag: 1,
					vAssignComment: body.comment,
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch(),
				});
				let addAssignHistory = await assignHistory.save();

				existingInventory.vAssignComment = body.comment;
				await existingInventory.save();
			}

			let endDate = body.endDate || null;

			if (endDate) {
				let unassignHistory = models.InventoryHistory.build({
					iInventoryId: body.iInventoryId,
					vEmployeeId: body.vInventoryUserId,
					iInventoryDate: await covertDatetoEpoch(endDate),
					tiInventoryFlag: 0,
					vAssignComment: body.comment,
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch(),
				});
				let addunassignHistory = await unassignHistory.save();
			}

			return callback(null, { status: HttpCodes['API_SUCCESS'], msg: 'InventoryAssignToUser', code: HttpCodes['OK'] });
		} catch (error) {
			return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: {} });
		}
	}

	async unassignInventory(body, callback) {
		try {
			body.dtUpdatedAt = moment().tz('Asia/Kolkata').format();

			const existingInventory = await models.Inventory.findOne({
				where: { iInventoryId: body.iInventoryId },
			});

			if (!existingInventory) {
				return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'InventoryNotFound', code: HttpCodes['NOT_FOUND'], data: {} });
			}

			if (existingInventory.iSystemId !== null) {
				return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'InventoryAlreadyAssignedToSystem', code: HttpCodes['BAD_REQUEST'], data: {} });
			}

			await models.Inventory.update(
				{ vAssetUser: null, vEmployeeId: null, dtUpdatedAt: body.dtUpdatedAt },
				{ where: { iInventoryId: body.iInventoryId } }
			);

			const unassignHistory = await models.InventoryHistory.build({
				iInventoryId: body.iInventoryId,
				vEmployeeId: body.vInventoryUserId,
				iInventoryDate: await getEpoch(),
				tiInventoryFlag: 0,
				iCreatedAt: await getEpoch(),
				iUpdatedAt: await getEpoch(),
			});

			await unassignHistory.save();

			return callback(null, { status: HttpCodes['API_SUCCESS'], msg: 'InventoryUnassignSuccess', code: HttpCodes['OK'] });
		} catch (error) {
			return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: {} });
		}
	}


	async getInventoryHistory(body, params, callback) {
		try {
			let filter = {};
			filter['where'] = { iInventoryId: params.iInventoryId };
			filter['include'] = [
				{
					model: models.UserDetails
				}
			];

			filter['order'] = [['iInventoryHistoryId', 'DESC']];

			let inventoryHistory = await models.InventoryHistory.findAll(filter);
			if (inventoryHistory) {
				return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'APISuccess', code: HttpCodes['OK'], data: inventoryHistory });
			} else {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
			}
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}




}