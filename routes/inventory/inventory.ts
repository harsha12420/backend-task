import commonHelper from "../../helpers/CommonController";
const { createAccessToken, checkAccessToken, checkAccountType } =
  new commonHelper();

import InventoryController from "../../controllers/InventoryController";
const {
  addInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  prepareDashboard,
  assignInventorytoUser,
  unassignInventory,
  getInventoryHistory,
} = new InventoryController();

module.exports = function (router) {
  router.post("/v1/add", checkAccessToken, checkAccountType, addInventory);
  router.get("/v1/getAllInventory", checkAccessToken, getAllInventory);
  router.get("/v1/getById/:iInventoryId", checkAccessToken, getInventoryById);
  router.get("/v1/inventoryHistory/:iInventoryId",checkAccessToken,getInventoryHistory);
  router.get("/v1/dashboard", checkAccessToken, prepareDashboard);
  router.put(
    "/v1/update/:iInventoryId",
    checkAccessToken,
    checkAccountType,
    updateInventory
  );
  router.delete(
    "/v1/delete/:iInventoryId",
    checkAccessToken,
    checkAccountType, 
    deleteInventory
  );
  router.post("/v1/assignInventorytoUser",
  checkAccessToken,
  checkAccountType,   
  assignInventorytoUser
  );
  router.post("/v1/unassignInventory",
  checkAccessToken,
  checkAccountType,
  unassignInventory
  );

};
