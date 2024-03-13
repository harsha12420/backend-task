"use strict";

const models = require("./../models/index");
import { HttpCodes } from "../helpers/responseCodes";
import { extname } from "path";
import { paths } from "../helpers/staticCode";
import commonHelper from "../helpers/CommonController";
import { Op } from "sequelize";
const { Sequelize } = require('sequelize');


const {
	getEpoch,
	uploadS3Image
} = new commonHelper();
export default class BillService {
	constructor() {
		this.addBill = this.addBill.bind(this);
		this.getAllBill = this.getAllBill.bind(this);
		this.getBillById = this.getBillById.bind(this);
		this.updateBill = this.updateBill.bind(this);
		this.deleteBill = this.deleteBill.bind(this);
	}

	async addBill(body, files, callback) {
		try {
			let billUploadPath = `${paths[process.env.NODE_ENV]['BILL_BUCKET']}`;

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

				let addBill = models.Bill.build({
					vBillNo: body.vBillNo,
					vVendorDetails: body.vVendorDetails,
					iAddedBy: body.currentUserId,
					vBillImage: fullUrl,
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch(),
				});

				let bill = await addBill.save();
				return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddBillSuccess", code: HttpCodes["OK"], data: addBill.toJSON() });
			} else {
				let addBill = models.Bill.build({
					vBillNo: body.vBillNo,
					vVendorDetails: body.vVendorDetails,
					iAddedBy: body.currentUserId,
					iCreatedAt: await getEpoch(),
					iUpdatedAt: await getEpoch(),
				});

				let bill = await addBill.save();
				return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddBillSuccess", code: HttpCodes["OK"], data: addBill.toJSON() });
			}
		} catch (error) {
			if (error instanceof Sequelize.UniqueConstraintError) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "DuplicateBillNumber", code: HttpCodes["BAD_REQUEST"], data: {} });
			} else {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
			}
		}
	}


	async getAllBill(page: string, limit: string, callback: any) {
		try {
			const offset = (Number(page) - 1) * Number(limit);
			let filter = { tiDeletedAt: { [Op.or]: [null, 0] } };


			const totalCount = await models.Bill.count({
				include: [
					{
						model: models.User,
						attributes: ['vEmployeeId', 'vFirstName', 'vLastName']
					},
				],
				where: filter,
			});

			const bill = await models.Bill.findAll({
				include: [
					{
						model: models.User,
						attributes: ['vEmployeeId', 'vFirstName', 'vLastName']
					},
				],
				where: filter,
				offset,
				limit: Number(limit),
			});

			if (bill.length === 0) {
				return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetBillData", code: HttpCodes["OK"], data: bill });
			}

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetBillData", code: HttpCodes["OK"], data: { totalCount, paginatedBill: bill } });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async getBillById(params: any, callback: any) {
		try {
			const bill = await models.Bill.findOne({ where: { iBillId: params.iBillId } });

			if (!bill) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "BillNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
			}

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetBillById", code: HttpCodes["OK"], data: bill });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async updateBill(params: any, body: any, files: any, callback: any) {
		try {
			let billUploadPath = `${paths[process.env.NODE_ENV]['BILL_BUCKET']}`;

			// Check if files are provided for image upload
			if (files.length > 0) {
				let extName = extname(files[0]['originalname']).toLowerCase().substring(1);
				let fileName = `${body.vBillNo}.${extName}`;

				const existingBill = await models.Bill.findOne({ where: { iBillId: params.iBillId } });

				// Delete existing image if it exists
				if (existingBill && existingBill.vBillImage) {
					const imageUrl = existingBill.vBillImage;
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

				await models.Bill.update(
					{ ...body, vBillImage: fullUrl },
					{ where: { iBillId: params.iBillId } }
				);
			} else {
				await models.Bill.update(
					body,
					{ where: { iBillId: params.iBillId } }
				);
			}

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "UpdateBill", code: HttpCodes["OK"] });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}

	async deleteBill(params: any, callback: any) {
		try {
			let delBill = {};
			delBill['where'] = { iBillId: params.iBillId }
			await models.Bill.update({ tiDeletedAt: 1, iUpdatedAt: await getEpoch(), }, delBill);

			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "deleteBill", code: HttpCodes["OK"] });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "FailedToDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}


}