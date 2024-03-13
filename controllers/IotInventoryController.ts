"use strict";

import IotInventoryService from "../services/IotInventoryService";
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class IotInventoryController {
  iotInventory: IotInventoryService;
  constructor() {
    this.iotInventory = new IotInventoryService();
    this.addIotInventory = this.addIotInventory.bind(this);
    this.getAllIotInventory = this.getAllIotInventory.bind(this);
    this.getIotInventoryById = this.getIotInventoryById.bind(this);
    this.updateIotInventory = this.updateIotInventory.bind(this);
    this.deleteIotInventory = this.deleteIotInventory.bind(this);
    this.iotCount = this.iotCount.bind(this);
  }

  addIotInventory(req: any, res: any) {
    this.iotInventory.addIotInventory(req.body, req.files, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  getAllIotInventory(req: any, res: any) {
    const { page, limit, searchString } = req.query;
    this.iotInventory.getAllIotInventory(page, limit, searchString, async (error: any, result: any) => {
      await APIResponse(res, error, result);
    });
  }

  getIotInventoryById(req: any, res: any) {
    this.iotInventory.getIotInventoryById(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  updateIotInventory(req: any, res: any) {
    this.iotInventory.updateIotInventory(
      req.params,
      req.body,
      req.files,
      async (error: any, result: any) => {
        await APIResponse(res, error, result);
      }
    );
  }

  deleteIotInventory(req: any, res: any) {
    this.iotInventory.deleteIotInventory(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  iotCount(req: any, res: any) {
    this.iotInventory.iotCount(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }
}
