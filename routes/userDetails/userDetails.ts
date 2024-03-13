import commonHelper from "../../helpers/CommonController";
const {
  createAccessToken,
  checkAccessToken,
} = new commonHelper();

import userDetailsController from "../../controllers/UserDetailsController";
const {
    getUserDetailsById
} = new userDetailsController();


module.exports = function (router) {
router.get("/v1/:vEmployeeId", getUserDetailsById)
}