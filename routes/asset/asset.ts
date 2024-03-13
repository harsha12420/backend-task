import commonHelper from "../../helpers/CommonController";
const { 
  createAccessToken,
  checkAccessToken, 
} = new commonHelper();

import AssetController from "../../controllers/AssetController";
const { 
  addAsset, getAllAsset, getAssetById, updateAsset, deleteAsset,
} = new AssetController();

module.exports = function (router) {
  router.post("/v1/add", addAsset);
  router.get("/v1/getAllAsset", getAllAsset);
  router.get("/v1/getById/:iAssetId", getAssetById);
  router.put("/v1/update/:iAssetId", updateAsset);
  router.delete("/v1/delete/:iAssetId", deleteAsset);
}