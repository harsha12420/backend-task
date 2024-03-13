"use strict";

import AssetService from "../services/AssetService";
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class InventoryController {
    asset: AssetService;
    constructor() {
        this.asset = new AssetService();
        this.addAsset = this.addAsset.bind(this);
        this.getAllAsset = this.getAllAsset.bind(this);
        this.getAssetById = this.getAssetById.bind(this);
        this.updateAsset = this.updateAsset.bind(this);
        this.deleteAsset = this.deleteAsset.bind(this);
    }

    addAsset(req: any, res: any) {
        this.asset.addAsset(req.body, async (error, result) => {
            await APIResponse(res, error, result);
        })
    }

    getAllAsset(req: any, res: any) {
        this.asset.getAllAsset(req.body, async (error, result) => {
            await APIResponse(res, error, result);
        })
    }

    getAssetById(req: any, res: any) {
        this.asset.getAssetById(req.params, async (error, result) => {
            await APIResponse(res, error, result);
        });
    }

    updateAsset(req: any, res: any) {
        this.asset.updateAsset(req.params, req.body, async (error, result) => {
            await APIResponse(res, error, result);
        })
    }

    deleteAsset(req: any, res: any) {
        this.asset.deleteAsset(req.params, async (error, result) => {
            await APIResponse(res, error, result);
        });
    }
}