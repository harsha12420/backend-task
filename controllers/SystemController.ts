"use strict";

import SystemService from "../services/SystemService";
import commonHelper from "../helpers/CommonController";
const {
  APIResponse
} = new commonHelper();

export default class SystemController {

  public system: SystemService;
  constructor() {
    this.system = new SystemService();
    this.getInventoryList = this.getInventoryList.bind(this);
    this.addSystem = this.addSystem.bind(this);
    this.getAllSystem = this.getAllSystem.bind(this);
    this.deleteSystem = this.deleteSystem.bind(this);
    this.systemCount = this.systemCount.bind(this);
    this.getSystemById = this.getSystemById.bind(this);
    this.updateSystem = this.updateSystem.bind(this);
    this.assignSystemtoUser = this.assignSystemtoUser.bind(this);
    this.getSystemHistory = this.getSystemHistory.bind(this);
    this.unassignSystem = this.unassignSystem.bind(this);
  }

  getInventoryList(req, res) {
    this.system.getInventoryList(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  addSystem(req, res) {
    this.system.addSystem(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  getAllSystem(req: any, res: any) {
    const { page, limit, hasAssetUser } = req.query;
    this.system.getAllSystem(page, limit, hasAssetUser, async (error: any, result: any) => {
      await APIResponse(res, error, result);
    });
  }


  getSystemById(req: any, res: any) {
    this.system.getSystemById(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  updateSystem(req: any, res: any) {
    this.system.updateSystem(req.params, req.body, async (error, result) => {
      await APIResponse(res, error, result);
    })
  }

  deleteSystem(req: any, res: any) {
    this.system.deleteSystem(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  systemCount(req: any, res: any) {
    this.system.systemCount(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  assignSystemtoUser(req: any, res: any) {
    this.system.assignSystemtoUser(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  getSystemHistory(req: any, res: any) {
    this.system.getSystemHistory(req.body, req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  unassignSystem(req: any, res: any) {
    this.system.unassignSystem(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }
}
