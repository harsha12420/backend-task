"use strict";

import UserDetailsSerice from "../services/UserDetailsService"
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class UserDetailsController {
    userDetails: UserDetailsSerice;
    constructor() {
        this.userDetails = new UserDetailsSerice();
        this.getUserDetailsById = this.getUserDetailsById.bind(this);
    }

    getUserDetailsById(req: any, res: any) {
        this.userDetails.getUserDetailsById(req.params, async (error, result) => {
            await APIResponse(res, error, result);
        });
    }
}





