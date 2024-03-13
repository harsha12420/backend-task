"use strict";

import commonHelper from "../helpers/CommonController";
import moment from "moment-timezone";
import { HttpCodes } from "../helpers/responseCodes";

const {
	getEpoch,
	covertDatetoEpoch
} = new commonHelper();
const models = require('./../models/index');

export default class IotMasterService {
  constructor() {
    this.addIotAsset = this.addIotAsset.bind(this);
    this.getAllIotAsset = this.getAllIotAsset.bind(this);
    this.deleteIotAsset = this.deleteIotAsset.bind(this);
  }

  async addIotAsset(body: any, callback: any) {
    try {
      console.log("111111111111");
      
      // Add the dtCreatedAt & dtDeletedAt field with the current timestamp in the specified timezone
      body.iCreatedAt = await getEpoch(),
      body.iUpdatedAt = await getEpoch()

      console.log( body.iCreatedAt, body.iUpdatedAt, "body.createdupdatedATTTTTTTTTTTTTTTTTTTTTTTTTTTTTT" );
      

      let iotAsset = models.IotMaster.build(body);
      let item = await iotAsset.save();

      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddIotAssetSuccess", code: HttpCodes["OK"], data: item });
    } catch (error) {
      console.error('Error:', error);
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async getAllIotAsset(body: any, callback: any) {
    try {
      const iotAssets = await models.IotMaster.findAll({
        where: {
          tiDeletedAt: {
            [models.Sequelize.Op.or]: [null, 0],
          },
        },
      });
  
      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetIotData", code: HttpCodes["OK"], data: iotAssets });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async deleteIotAsset(params: any, callback: any) {
    const updatedAt = await getEpoch();
    try {
      //delete the inventory record
      let delIotAsset = {};
      delIotAsset['where'] = { iIotId: params.iIotId }
      await models.IotMaster.update({ tiDeletedAt: 1, dtUpdatedAt:updatedAt}, delIotAsset);

      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "deleteIotAsset", code: HttpCodes["OK"] });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "FailedToDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

}