"use strict";

const models = require("./../models/index");
import moment from "moment-timezone";
import { HttpCodes } from "../helpers/responseCodes";

export default class AssetService {
  constructor() {
    this.addAsset = this.addAsset.bind(this);
    this.getAllAsset = this.getAllAsset.bind(this);
    this.getAssetById = this.getAssetById.bind(this);
    this.updateAsset = this.updateAsset.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
  }

  async addAsset(body: any, callback: any) {
    try {
      // Add the dtCreatedAt & dtDeletedAt field with the current timestamp in the specified timezone
      body.dtCreatedAt = moment().tz('Asia/Kolkata').format();
      body.dtUpdatedAt = moment().tz('Asia/Kolkata').format();

      let asset = models.Asset.build(body);
      let item = await asset.save();

      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddAssetSuccess", code: HttpCodes["OK"], data: item });
    } catch (error) {
      console.error('Error:', error);
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async getAllAsset(body: any, callback: any) {
    try {

      const asset = await models.Asset.findAll();

      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetAssetData", code: HttpCodes["OK"], data: asset });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async getAssetById(params: any, callback: any) {
    try {

      const asset = await models.Asset.findOne({
        where: { iAssetId: params.iAssetId },
      });
      if (!asset) {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "AssetNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
      }
      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetAssetById", code: HttpCodes["OK"], data: asset });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async updateAsset(params: any, body: any, callback: any) {
    try {

      body.dtUpdatedAt = moment().tz('Asia/Kolkata').format();

      // Update the inventory record
      await models.Asset.update(body, {
        where: { iAssetId: params.iAssetId },   // Replace `id` with the appropriate column name for identifying the inventory record
      });
      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "UpdateAsset", code: HttpCodes["OK"] });

    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    };
  }

  async deleteAsset(params: any, callback: any) {
    try {
      //delete the inventory record
      let delAsset = {};
      delAsset['where'] = { iAssetId: params.iAssetId }
      await models.Asset.update({ tiDeletedAt: 1, dtUpdatedAt: moment().tz('Asia/Kolkata').format() }, delAsset);

      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "deleteAsset", code: HttpCodes["OK"] });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "FailedToDelete", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

}