"use strict";

import { HttpCodes } from "../helpers/responseCodes";
import commonHelper from "../helpers/CommonController";
const {
  getEpoch
} = new commonHelper();
const models = require('./../models/index');

export default class AdminService {

  constructor() {
    this.abc = this.abc.bind(this);
  }

  async abc(data, callback) {
    try {
     
      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "Success", code: HttpCodes["OK"] });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }
}
