"use strict";

import InventoryService from "../services/InventoryService";
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class InventoryController {
  inventory: InventoryService;
  constructor() {
    this.inventory = new InventoryService();
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

  addInventory(req: any, res: any) {
    this.inventory.addInventory(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    })
  }

  getAllInventory(req: any, res: any) {
    const { page, limit, searchString, selectedFilter, iAssetType } = req.query;
    this.inventory.getAllInventory(page, limit, searchString, selectedFilter, iAssetType, async (error: any, result: any) => {
      await APIResponse(res, error, result);
    });
  }
  

  getInventoryById(req: any, res: any) {
    this.inventory.getInventoryById(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  updateInventory(req: any, res: any) {
    this.inventory.updateInventory(req.params, req.body, async (error, result) => {
      await APIResponse(res, error, result);
    })
  }

  deleteInventory(req: any, res: any) {
    this.inventory.deleteInventory(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  prepareDashboard(req: any, res: any) {
    this.inventory.prepareDashboard(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  assignInventorytoUser(req: any, res: any) {
    this.inventory.assignInventorytoUser(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  unassignInventory(req: any, res: any) {
    this.inventory.unassignInventory(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  getInventoryHistory(req: any, res: any) {
    this.inventory.getInventoryHistory(req.body, req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

}