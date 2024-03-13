const multer = require("multer");
var upload = multer();
import commonHelper from "../../helpers/CommonController";
const { createAccessToken, checkAccessToken, checkAccountType } =
  new commonHelper();

import IotInventoryController from "../../controllers/IotInventoryController";
const { addIotInventory, getAllIotInventory, getIotInventoryById, updateIotInventory, deleteIotInventory, iotCount } =
  new IotInventoryController();

module.exports = function (router) {
  router.post(
    "/v1/addIotInventory",
    upload.any(),
    checkAccessToken,
    checkAccountType,
    addIotInventory
  );
  router.get("/v1/getAllIotInventory", checkAccessToken, getAllIotInventory);
  router.get("/v1/getIotInventoryById/:iIotInventoryId", checkAccessToken, getIotInventoryById);
  router.put(
    "/v1/updateIotInventory/:iIotInventoryId",
    upload.any(),
    checkAccessToken,
    checkAccountType,
    updateIotInventory
  );
  router.delete(
    "/v1/deleteIotInventory/:iIotInventoryId",
    checkAccessToken,
    checkAccountType,
    deleteIotInventory
  );
  router.get("/v1/getCount", checkAccessToken, iotCount);
};
