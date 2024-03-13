
import AdminController from "../../controllers/AdminController";
const { 
  abc
} = new AdminController(); 

module.exports = function(router) {
  router.get('/v1/abc', abc);
}



