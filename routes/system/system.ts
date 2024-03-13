import commonHelper from "../../helpers/CommonController";
const { checkAccessToken, checkAccountType } = new commonHelper();

import SystemController from "../../controllers/SystemController";
const {
  getInventoryList,
  addSystem,
  getAllSystem,
  deleteSystem,
  systemCount,
  getSystemById,
  updateSystem,
  assignSystemtoUser,
  getSystemHistory,
  unassignSystem
} = new SystemController();

module.exports = function (router) {
  router.get("/v1/getInventoryList/:name", checkAccessToken, getInventoryList);
  router.post("/v1/addSystem", checkAccessToken, checkAccountType, addSystem);
  router.get("/v1/getAllSystem", checkAccessToken, getAllSystem);
  router.get("/v1/getSystemById/:iSystemId", checkAccessToken, getSystemById);
  router.delete("/v1/deleteSystem/:iSystemId",checkAccessToken,checkAccountType,deleteSystem);
  router.get("/v1/dashboard", checkAccessToken, systemCount);
  router.post("/v1/assignSystemtoUser",checkAccessToken,checkAccountType,assignSystemtoUser);
  router.put("/v1/updateSystem/:iSystemId",checkAccessToken,checkAccountType,updateSystem);
  router.get("/v1/systemHistory/:iSystemId",checkAccessToken,getSystemHistory);
  router.post("/v1/unassignSystem",checkAccessToken,checkAccountType,unassignSystem);
};
