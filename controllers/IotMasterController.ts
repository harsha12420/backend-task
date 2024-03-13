"use strict";

import IotMasterService from "../services/IotMasterService";
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class IotMasterController {
    iotAsset: IotMasterService;
    constructor() {
        this.iotAsset = new IotMasterService();
        this.addIotAsset = this.addIotAsset.bind(this);
        this.getAllIotAsset = this.getAllIotAsset.bind(this);
        this.deleteIotAsset = this.deleteIotAsset.bind(this);
    }

    addIotAsset(req: any, res: any) {
        this.iotAsset.addIotAsset(req.body, async (error, result) => {
            await APIResponse(res, error, result);
        })
    }

    getAllIotAsset(req: any, res: any) {
        this.iotAsset.getAllIotAsset(req.body, async (error, result) => {
            await APIResponse(res, error, result);
        })
    }

    deleteIotAsset(req: any, res: any) {
        this.iotAsset.deleteIotAsset(req.params, async (error, result) => {
            await APIResponse(res, error, result);
        });
    }
}