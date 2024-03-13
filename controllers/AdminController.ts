"use strict";

import AdminService from "../services/AdminService";

import commonHelper from "../helpers/CommonController";
const {
  APIResponse
} = new commonHelper();

export default class AdminController {

  public admin: AdminService;
  constructor() {
    this.admin = new AdminService();
    this.abc = this.abc.bind(this);
  }

  abc(req, res) {
    this.admin.abc(req.body, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }
}
