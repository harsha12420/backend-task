import swPaths from './SwaggerPaths';
import swDefinitions from './SwaggerDefinitions';
const {paths} = new swPaths();
const {definitions} = new swDefinitions();
let host = process.env.HOST+':'+process.env.PORT
if (process.env.NODE_ENV === 'staging') {
  host = "api-inventory-stage.solutionanalysts.us"
} else if (process.env.NODE_ENV === 'production') {
  host = ""
} else if (process.env.NODE_ENV === 'development') {
  host = "api-inventory-dev.solutionanalysts.us"
}
module.exports = {
    "swagger": "2.0",
    "info": {
      "title": "Inventory Management",
      "version": "1.0.0",
    },
    "host": host,
    "basePath": "/api",
    "paths": paths,
    "definitions": definitions,
    "responses": {},
    "parameters": {},
    "securityDefinitions": {},
    "tags": []
}
