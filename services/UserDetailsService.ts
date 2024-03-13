"use strict";

const models = require("./../models/index");
import { HttpCodes } from "../helpers/responseCodes";

export default class UserDetailsService {
	constructor() {
		this.getUserDetailsById = this.getUserDetailsById.bind(this);
	}

	async getUserDetailsById(params: any, callback: any) {
		try {
			const user = await models.UserDetails.findOne({ where: { vEmployeeId: params.vEmployeeId }});

			if (!user) {
				return callback(null, { status: HttpCodes["API_FAILURE"], msg: "UserNotFound", code: HttpCodes["BAD_REQUEST"], data: {} });
			}
			return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "APISuccess", code: HttpCodes["OK"], data: user });
		} catch (error) {
			return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
		}
	}
}