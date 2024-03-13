import commonHelper from "../../helpers/CommonController";
const { 
  createAccessToken,
  checkAccessToken, 
} = new commonHelper();

import IotMasterController from "../../controllers/IotMasterController";
const { 
  addIotAsset, getAllIotAsset, deleteIotAsset,
} = new IotMasterController();

module.exports = function (router) {
  router.post("/v1/add", checkAccessToken, addIotAsset);
  router.get("/v1/getAllIotAsset", checkAccessToken, getAllIotAsset);
  router.delete("/v1/delete/:iIotId", checkAccessToken, deleteIotAsset);
}