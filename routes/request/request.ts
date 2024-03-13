const multer = require("multer");
var upload = multer();
import commonHelper from "../../helpers/CommonController";
const { createAccessToken, checkAccessToken, checkAccountType } =
  new commonHelper();

import RequestController from "../../controllers/RequestController";
const {
  addRequest,
  acceptRejectRequest,
  closeRequest,
  getAllRequest,
  getById
} = new RequestController();

module.exports = function (router) {
  router.post("/v1/addRequest", checkAccessToken, checkAccountType, addRequest);
  router.get("/v1/getRequestById/:iRequestId", checkAccessToken, getById);
  router.put(
    "/v1/acceptRejectRequest/:iRequestId",
    checkAccessToken,
    acceptRejectRequest
  );
  router.post("/v1/closeRequest", upload.any(), checkAccessToken, closeRequest);
  router.get("/v1/getAllRequest", checkAccessToken, getAllRequest);
};
