const multer = require("multer");
var upload = multer();
import commonHelper from "../../helpers/CommonController";
const { createAccessToken, checkAccessToken, checkAccountType } =
  new commonHelper();

import BillController from "../../controllers/BillController";
const { addBill, getAllBill, getBillById, updateBill, deleteBill } =
  new BillController();

module.exports = function (router) {
  router.post(
    "/v1/addBill",
    upload.any(),
    checkAccessToken,
    checkAccountType,
    addBill
  );
  router.get("/v1/getAllBill", checkAccessToken, getAllBill);
  router.get("/v1/getBillById/:iBillId", checkAccessToken, getBillById);
  router.put(
    "/v1/updateBill/:iBillId",
    upload.any(),
    checkAccessToken,
    checkAccountType,
    updateBill
  );
  router.delete(
    "/v1/deleteBill/:iBillId",
    checkAccessToken,
    checkAccountType,
    deleteBill
  );
};
