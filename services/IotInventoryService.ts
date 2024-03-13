"use strict";

const models = require("./../models/index");
import { HttpCodes } from "../helpers/responseCodes";
import { extname } from "path";
import { paths } from "../helpers/staticCode";
import commonHelper from "../helpers/CommonController";
import { Op } from "sequelize";
var sequelize = require("sequelize");

const {
    getEpoch,
    uploadS3Image
} = new commonHelper();
export default class IotInventoryService {
    constructor() {
        this.addIotInventory = this.addIotInventory.bind(this);
        this.getAllIotInventory = this.getAllIotInventory.bind(this);
        this.getIotInventoryById = this.getIotInventoryById.bind(this);
        this.updateIotInventory = this.updateIotInventory.bind(this);
        this.deleteIotInventory = this.deleteIotInventory.bind(this);
        this.iotCount = this.iotCount.bind(this);
    }

    async addIotInventory(body, files, callback) {
        try {
            let billUploadPath = `${paths[process.env.NODE_ENV]['IOT_DEVICE_BILL_BUCKET']}`;

            if (files && files.length > 0) {
                let extName = extname(files[0]['originalname']).toLowerCase().substring(1);
                let fileName = `${body.vBillNo}.${extName}`;

                let fileParams = {
                    Bucket: process.env.BUCKETNAME,
                    acl: 'public-read',
                    Key: `${billUploadPath}${fileName}`,
                    Body: files[0]['buffer'],
                    ContentType: "image/" + extName
                };
                await uploadS3Image(fileParams);

                const baseUrl = process.env.BASEURL;
                const fullUrl = `${baseUrl}${billUploadPath}${fileName}`;

                let addIotInventory = models.IotInventory.build({
                    iIotType: body.iIotType,
                    vIotAssetName: body.vIotAssetName,
                    vBillNo: body.vBillNo,
                    vBillImage: fullUrl,
                    vProjectName: body.vProjectName,
                    vEmployeeId: body.EmployeeId,
                    vSerial_ModelNumber: body.vSerial_ModelNumber,
                    vBrandMaker: body.vBrandMaker,
                    iPurchaseDate: body.iPurchaseDate,
                    vWarrentyPeriod: body.vWarrentyPeriod,
                    iExpiryDate: body.iExpiryDate,
                    vComment: body.vComment,
                    iCreatedAt: await getEpoch(),
                    iUpdatedAt: await getEpoch(),
                });

                await addIotInventory.save();
                return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddIotAssetSuccess", code: HttpCodes["OK"], data: addIotInventory.toJSON() });
            } else {
                let addInventory = models.IotInventory.build({
                    iIotType: body.iIotType,
                    vIotAssetName: body.vIotAssetName,
                    vBillNo: body.vBillNo,
                    vProjectName: body.vProjectName,
                    vEmployeeId: body.EmployeeId,
                    vSerial_ModelNumber: body.vSerial_ModelNumber,
                    vBrandMaker: body.vBrandMaker,
                    iPurchaseDate: body.iPurchaseDate,
                    vWarrentyPeriod: body.vWarrentyPeriod,
                    iExpiryDate: body.iExpiryDate,
                    vComment: body.vComment,
                    iCreatedAt: await getEpoch(),
                    iUpdatedAt: await getEpoch(),
                });

                let bill = await addInventory.save();
                return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddIotAssetSuccess", code: HttpCodes["OK"], data: addInventory.toJSON() });
            }
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                return callback(null, { status: HttpCodes["API_FAILURE"], msg: "DuplicateBillNumber", code: HttpCodes["BAD_REQUEST"], data: {} });
            } else {
                return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
            }
        }
    }


    async getAllIotInventory(page: string, limit: string, search: string, callback: any) {
        try {
            const offset = (Number(page) - 1) * Number(limit);
            let filter = { tiDeletedAt: { [Op.or]: [null, 0] } };


            if (search) {
                filter[Op.or] = [
                    { '$UserDetail.vFirstName$': { [Op.like]: `%${search}%` } },
                    { '$UserDetail.vLastName$': { [Op.like]: `%${search}%` } },
                    sequelize.literal(`CONCAT(vFirstName, ' ', vLastName) LIKE '%${search}%'`), // Corrected line
                    { vBillNo: { [Op.like]: `%${search}%` } },
                    { vIotAssetName: { [Op.like]: `%${search}%` } },
                ];
            }

            const totalCount = await models.IotInventory.count({
                include: [
                    {
                        model: models.UserDetails,
                    },
                    {
                        model: models.IotMaster,
                    },
                ],
                where: filter,
            });

            const iotInventory = await models.IotInventory.findAll({
                include: [
                    {
                        model: models.UserDetails
                    },
                    {
                        model: models.IotMaster
                    },
                ],
                where: filter,
                offset,
                limit: Number(limit),
            });

            const iotInventoryData = await models.IotInventory.findAll({
                include: [
                    {
                        model: models.UserDetails
                    },
                    {
                        model: models.IotMaster
                    },
                ],
                where: filter
            });

            if (iotInventory.length === 0) {
                return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetIotInventoryData", code: HttpCodes["OK"], data: iotInventory });
            }

            return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetIotInventoryData", code: HttpCodes["OK"], data: { totalCount, paginatedBill: iotInventory, inventory: iotInventoryData } });
        } catch (error) {
            return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
        }
    }

    async getIotInventoryById(params: any, callback: any) {
        try {
            const iotInventory = await models.IotInventory.findOne({
                where: {
                    iIotInventoryId: params.iIotInventoryId,
                    tiDeletedAt: { [models.Sequelize.Op.or]: [null, 0] }
                }
            });

            if (!iotInventory) {
                return callback(null, { status: HttpCodes["API_FAILURE"], msg: "BillNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
            }

            return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetBillById", code: HttpCodes["OK"], data: iotInventory });
        } catch (error) {
            return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
        }
    }

    async updateIotInventory(params: any, body: any, files: any, callback: any) {
        try {
            let billUploadPath = `${paths[process.env.NODE_ENV]['IOT_DEVICE_BILL_BUCKET']}`;

            // Check if files are provided for image upload
            if (files.length > 0) {
                let extName = extname(files[0]['originalname']).toLowerCase().substring(1);
                let fileName = `${body.vBillNo}.${extName}`;

                const existingIotDevice = await models.IotInventory.findOne({ where: { iIotInventoryId: params.iIotInventoryId } });

                // Delete existing image if it exists
                if (existingIotDevice && existingIotDevice.vBillImage) {
                    const imageUrl = existingIotDevice.vBillImage;
                    const existingImageKey = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                    const existingFileName = existingImageKey.substring(0, existingImageKey.lastIndexOf('.'));
                    fileName = `${existingFileName}.${extName}`;

                    const AWS = require('aws-sdk');
                    const s3 = new AWS.S3();

                    const deleteParams = {
                        Bucket: process.env.BUCKETNAME,
                        Key: `${billUploadPath}${existingImageKey}`
                    };
                    await s3.deleteObject(deleteParams).promise();
                }

                let fileParams = {
                    Bucket: process.env.BUCKETNAME,
                    acl: 'public-read',
                    Key: `${billUploadPath}${fileName}`,
                    Body: files[0]['buffer'],
                    ContentType: "image/" + extName
                };

                await uploadS3Image(fileParams);
                const baseUrl = process.env.BASEURL;
                const fullUrl = `${baseUrl}${billUploadPath}${fileName}`;

                await models.IotInventory.update(
                    {
                        iIotType: body.iIotType,
                        vIotAssetName: body.vIotAssetName,
                        vBillNo: body.vBillNo,
                        vBillImage: fullUrl,
                        vProjectName: body.vProjectName,
                        vEmployeeId: body.EmployeeId,
                        vSerial_ModelNumber: body.vSerial_ModelNumber,
                        vBrandMaker: body.vBrandMaker,
                        iPurchaseDate: body.iPurchaseDate,
                        vWarrentyPeriod: body.vWarrentyPeriod,
                        iExpiryDate: body.iExpiryDate,
                        vComment: body.vComment,
                        iCreatedAt: await getEpoch(),
                        iUpdatedAt: await getEpoch(),
                    },
                    { where: { iIotInventoryId: params.iIotInventoryId } }
                );
            } else {

                await models.IotInventory.update({
                    iIotType: body.iIotType,
                    vIotAssetName: body.vIotAssetName,
                    vBillNo: body.vBillNo,
                    vProjectName: body.vProjectName,
                    vEmployeeId: body.EmployeeId,
                    vSerial_ModelNumber: body.vSerial_ModelNumber,
                    vBrandMaker: body.vBrandMaker,
                    iPurchaseDate: body.iPurchaseDate,
                    vWarrentyPeriod: body.vWarrentyPeriod,
                    iExpiryDate: body.iExpiryDate,
                    vComment: body.vComment,
                    iCreatedAt: await getEpoch(),
                    iUpdatedAt: await getEpoch(),
                },
                    { where: { iIotInventoryId: params.iIotInventoryId } }
                );
            }

            return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "UpdateIot", code: HttpCodes["OK"] });
        } catch (error) {
            return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
        }
    }

    async deleteIotInventory(params: any, callback: any) {
        try {
            let delBill = {};
            delBill['where'] = { iIotInventoryId: params.iIotInventoryId }
            await models.IotInventory.update({ tiDeletedAt: 1, iUpdatedAt: await getEpoch(), }, delBill);

            return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "deleteIotAsset", code: HttpCodes["OK"] });
        } catch (error) {
            return callback(null, { status: HttpCodes["API_FAILURE"], msg: "FailedToDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
        }
    }


    async iotCount(body: any, callback: any) {
		try {
			const totalIotDevice = await models.IotInventory.count({
				where: {
					tiDeletedAt: {
						[models.Sequelize.Op.or]: [null, 0], // Include IotInventory with tiDeletedAt null or 0
					},
				},
			});
            
			const totalAssignedIotDevice = await models.IotInventory.count({
                where: {
                  vEmployeeId: {
                    [models.Sequelize.Op.not]: null,
                  },
                  tiDeletedAt: {
                    [models.Sequelize.Op.or]: [null, 0],
                  },
                },
              });

			const totalUnassignedIotDevice = totalIotDevice - totalAssignedIotDevice;

			return callback(null, {
				status: HttpCodes["API_SUCCESS"],
				msg: "DashboardData",
				code: HttpCodes["OK"],
				data: {
					totalIotDevice,
					totalAssignedIotDevice,
					totalUnassignedIotDevice,
				},
			});
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

}