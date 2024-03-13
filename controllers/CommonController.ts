"use strict";

import CommonService from "../services/CommonService";
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class CommonController {
  common: CommonService;
  constructor() {
    this.common = new CommonService();
    this.login = this.login.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.checkUrlToken = this.checkUrlToken.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.dashboardCount = this.dashboardCount.bind(this);
    this.logout = this.logout.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.getLoginUser = this.getLoginUser.bind(this);
    this.updateLoginUser = this.updateLoginUser.bind(this);
  }

  login(req: any, res: any) {
    this.common.login(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  forgotPassword(req: any, res: any) {
    this.common.forgotPassword(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  checkUrlToken(req: any, res: any) {
    this.common.checkUrlToken(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  resetPassword(req: any, res: any) {
    this.common.resetPassword(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  changePassword(req: any, res: any) {
    this.common.changePassword(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }


  dashboardCount(req: any, res: any) {
    this.common.dashboardCount(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  logout(req: any, res: any) {
    this.common.logout(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  getLoginUser(req: any, res: any) {
    this.common.getLoginUser(req.body, async (error: any, result: any) => {
      await APIResponse(res, error, result);
    });
  }

  updateLoginUser(req: any, res: any) {
    this.common.updateLoginUser(req.body, req.files, async (error: any, result: any) => {
      await APIResponse(res, error, result);
    });
  }
}
