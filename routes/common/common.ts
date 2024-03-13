const multer = require('multer');
var upload = multer();
import commonHelper from "../../helpers/CommonController";
const { 
  createAccessToken,
  checkAccessToken, 
} = new commonHelper();

import CommonController from "../../controllers/CommonController";
const { 
  login,
  forgotPassword,
  checkUrlToken,
  resetPassword,
  dashboardCount,
  logout,
  changePassword,
  getLoginUser,
  updateLoginUser
} = new CommonController();

module.exports = function (router) {
  router.post("/v1/login", createAccessToken, login);
  router.post("/v1/forgot-password", forgotPassword);
  router.get('/v1/check-url-token/:txEmailToken', checkUrlToken);
  router.post("/v1/reset-password", resetPassword);
  router.get("/v1/dashboard-count", checkAccessToken, dashboardCount);
  router.post("/v1/logout", checkAccessToken, logout);
  router.post("/v1/change-password", checkAccessToken, changePassword);
  router.get("/v1/userProfile", checkAccessToken, getLoginUser);
  router.put("/v1/updateProfile", upload.any(), checkAccessToken, updateLoginUser);
}