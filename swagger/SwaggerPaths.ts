export default class SwaggerPaths {

  paths = {
    "/common/v1/login": {
      post: {
        tags: ["Global"],
        summary: "Login User",
        description: "Login User",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "loginModel",
            description: "Login",
            in: "body",
            required: true,
            schema: {
              required: [
                "vEmailId",
                "txPassword",
                "tiAccountType",
                "tiAccountStatus"
              ],
              "$ref": "#/definitions/loginReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Login user details",
            schema: {
              $ref: "#/definitions/loginRes"
            }
          }
        }
      }
    },
    "/common/v1/forgot-password": {
      post: {
        tags: ["Global"],
        summary: "Forgot Password",
        description: "Forgot Password",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "forgotPassword", 
            description: "Login",
            in: "body",
            required: true,
            schema: {
              required: [
                "vEmailId",
              ],
              "$ref": "#/definitions/forgotPasswordReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Login user details",
            schema: {
              $ref: "#/definitions/forgotPasswordRes"
            }
          }
        }
      }
    },
    "/common/v1/reset-password": {
      post: {
        tags: ["Global"],
        summary: "Reset Password",
        description: "Reset Password",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "ResetPassword",
            description: "Login",
            in: "body",
            required: true,
            schema: {
              required: [
                "iUserId",
                "txPassword"
              ],
              "$ref": "#/definitions/resetPasswordReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Login user details",
            schema: {
              $ref: "#/definitions/resetPasswordRes"
            }
          }
        }
      }
    },
    "/common/v1/check-url-token/{txEmailToken}": {
      get: {
        tags: ["Global"],
        summary: "Check url token",
        description: "Check url token",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "txEmailToken",
            schema: {
              type: "string",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "Check Url Token.",
          }
        }
      }
    },
    "/common/v1/dashboard-count": {
      get: {
        tags: ["Global"],
        summary: "Dashboard count",
        description: "Dashboard count",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
        ],
        responses: {
          "200": {
            description: "Dashboard count.",
          }
        }
      }
    },
    // "/common/v1/getUserList": {
    //   get: {
    //     tags: ["Admin Crud"],
    //     summary: "User List",
    //     description: "User List",
    //     produces: ["application/json"],
    //     consumes: ["application/json"],
    //     parameters: [
    //       {
    //         name: "authorization",
    //         description: "authorization token",
    //         in: "header",
    //         required: true,
    //         value: 'e6fae0dc47d77966b65364d9a6fe0519',
    //         type: "string"
    //       }
    //     ],
    //     responses: {
    //       "200": {
    //         description: "List of Users",
    //         schema: {
    //           $ref: "#/definitions/userListRes"
    //         }
    //       }
    //     }
    //   }
    // },
     "/common/v1/userProfile": {
      get: {
        tags: ["Admin Crud"],
        summary: "User List",
        description: "User List",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          }
        ],
        responses: {
          "200": {
            description: "Get Login User Detail",
            schema: {
              $ref: "#/definitions/userListRes"
            }
          }
        }
      }
    },
    "/common/v1/updateProfile": {
      put: {
        tags: ["Admin Crud"],
        summary: "close the request",
        description: "close the request",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          },
          {
            name: "vImageUrl",
            schema: {
              type: "file",
            },
            in: "formData",
          },
          {
            name: "vFirstName",
            schema: {
              type: "string",
            },
            in: "formData",
          },
          {
            name: "vLastName",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          // {
          //   name: "iRequestId",
          //   schema: {
          //     type: "integer",
          //   },
          //   in: "formData"
          // }
        ],
        responses: {
          "200": {
            description: "Update Login User Profile"
          }
        }
      }
    },
     "/common/v1/change-password": {
      post: {
        tags: ["Admin Crud"],
        summary: "Change Passeword",
        description: "Change Passeword",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            schema: {
              required: [
                "oldPassword",
                "newPassword",
                "confirmPassword",
              ],
              "$ref": "#/definitions/changePasswordReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Change password message",
          }
        }
      }
    },
    "/common/v1/logout": {
      post: {
        tags: ["Global"],
        summary: "Logout",
        description: "Logout",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            schema: {
              required: [
                "token",
              ],
              "$ref": "#/definitions/logoutReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Logout response message",
          }
        }
      }
    },
    "/inventory/v1/add": {
      post: {
        tags: ["Inventory Management"],
        summary: "add Inventory",
        description: "Add Invnetory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "add Inventory",
            in: "body",
            required: true,
            schema: {
              required: [
                "vBillNo",
                "vAssetName",
                "iAssetType",
                "vWarrentyPeriod"
              ],
              "$ref": "#/definitions/addInventoryReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Add Inventory",
            schema: {
              $ref: "#/definitions/addInventoryResModel"
            }
          }
        }
      }
    },
    "/inventory/v1/getAllInventory": {
      get: {
        tags: ["Inventory Management"],
        summary: "Get All Inventory",
        description: "Get All Inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "page",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "limit",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "searchString",
            schema: {
              type: "string",
            },
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "List of Inventory"
          }
        }
      }
    },
    "/inventory/v1/getById/{iInventoryId}": {
      get: {
        tags: ["Inventory Management"],
        summary: "Get All Inventory",
        description: "Get All Inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iInventoryId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular Inventory"
          }
        }
      }
    },
    "/inventory/v1/assignInventorytoUser": {
      post: {
        tags: ["Inventory Management"],
        summary: "assign inventory to user",
        description: "Assign Invnetory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "assign inventory to user",
            in: "body",
            required: true,
            schema: {
              required: [
                "vInventoryUserId",
                "iInventoryId"
              ],
              "$ref": "#/definitions/assignInventoryReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Assign Inventory to user",
            // schema: {
            //   $ref: "#/definitions/addInventoryResModel"
            // }
          }
        }
      }
    },
    "/inventory/v1/unassignInventory": {
      post: {
        tags: ["Inventory Management"],
        summary: "Unassign Inventory",
        description: "Unassign Invnetory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add",
            description: "Unassign Inventory",
            in: "body",
            required: true,
            schema: {
              required: [
                "vInventoryUserId",
                "iInventoryId"
              ],
              "$ref": "#/definitions/unassignInventoryReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Unassign Inventory",
            // schema: {
            //   $ref: "#/definitions/addInventoryResModel"
            // }
          }
        }
      }
    },
    "/inventory/v1/inventoryHistory/{iInventoryId}": {
      get: {
        tags: ["Inventory Management"],
        summary: "Get Inventory History",
        description: "Get Inventory History",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iInventoryId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the particular inventory history."
          }
        }
      }
    },
    "/inventory/v1/update/{iInventoryId}": {
      put: {
        tags: ["Inventory Management"],
        summary: "Update Inventory",
        description: "Update Inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iInventoryId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
          {
            name: "Update",
            description: "update Inventory",
            in: "body",
            required: true,
            schema: {
              "$ref": "#/definitions/updateInventoryReqModel"
            },
          },
        ],
        responses: {
          "200": {
            description: "update inventory message"
          }
        }
      }
    },
    "/inventory/v1/delete/{iInventoryId}": {
      delete: {
        tags: ["Inventory Management"],
        summary: "delete Inventory",
        description: "delete Inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iInventoryId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "delete message "
          }
        }
      }
    },
    "/inventory/v1/dashboard": {
      get: {
        tags: ["Inventory Management"],
        summary: "Get All Inventory",
        description: "Get All Inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          }
        ],
        responses: {
          "200": {
            description: "List of Total Number asset, Assigned and Unassigned asset "
          }
        }
      }
    },
    "/asset/v1/add": {
      post: {
        tags: ["Asset Management"],
        summary: "add asset",
        description: "Add Asset",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "Add ",
            description: "add Asset",
            in: "body",
            required: true,
            schema: {
              required: [
                "iAssetId",
                "iAssetType",
              ],
              "$ref": "#/definitions/addAssetReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Add asset.",
            schema: {
              $ref: "#/definitions/getAssetResModel"
            }
          }
        }
      }
    },
    "/asset/v1/getAllAsset": {
      get: {
        tags: ["Asset Management"],
        summary: "Get All Asset",
        description: "Get All Asset",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          }
        ],
        responses: {
          "200": {
            description: "List of asset"
          }
        }
      }
    },
    "/asset/v1/getById/{iAssetId}": {
      get: {
        tags: ["Asset Management"],
        summary: "Get All Asset",
        description: "Get All Asset",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          },
          {
            name: "iAssetId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular asset"
          }
        }
      }
    },
    "/asset/v1/update/{iAssetId}": {
      put: {
        tags: ["Asset Management"],
        summary: "Update Asset",
        description: "Update Asset",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "iAssetId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
          {
            name: "Update",
            description: "update Asset",
            in: "body",
            required: true,
            schema: {
              "$ref": "#/definitions/updateAssetReqModel"
            },
          },
        ],
        responses: {
          "200": {
            description: "update asset message",
          }
        }
      }
    },
    "/asset/v1/delete/{iAssetId}": {
      delete: {
        tags: ["Asset Management"],
        summary: "delete Asset",
        description: "delete Asset",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iAssetId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "delete message ",
          }
        }
      }
    },
    "/userDetails/v1/{vEmployeeId}": {
      get: {
        tags: ["User Details"],
        summary: "Get All User Details",
        description: "Get All User Details",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "vEmployeeId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular user",
          }
        }
      }
    },
    "/request/v1/addRequest": {
      post: {
        tags: ["Request Management"],
        summary: "add Request",
        description: "Add Request",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "add Request",
            in: "body",
            required: true,
            schema: {
              required: [
                "vBillNo",
                "vAssetName",
                "iAssetType",
                "vWarrentyPeriod"
              ],
              "$ref": "#/definitions/addReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Login user details",
            schema: {
              $ref: "#/definitions/addRequestResModel"
            }
          }
        }
      }
    },
    "/request/v1/getAllRequest": {
      get: {
        tags: ["Request Management"],
        summary: "Get All Request",
        description: "Get All Request",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "page",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "limit",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "flag",
            schema: {
              type: "boolean",
            },
            in: "query"
          }
        ],
        responses: {
          "200": {
            description: "List of Requests"
          }
        }
      }
    },
    "/request/v1/acceptRejectRequest/{iRequestId}": {
      put: {
        tags: ["Request Management"],
        summary: "Accept or Request",
        description: "Accept or Request",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iRequestId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
          {
            name: "Update",
            description: "update Accept or Reject Request",
            in: "body",
            required: true,
            schema: {
              "$ref": "#/definitions/updateAcceptRejectReqModel"
            },
          },
        ],
        responses: {
          "200": {
            description: "Accept or Reject Request"
          }
        }
      }
    },
    "/request/v1/getRequestById/{iRequestId}": {
      get: {
        tags: ["Request Management"],
        summary: "Get All Request",
        description: "Get All Request",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          },
          {
            name: "iRequestId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular request"
          }
        }
      }
    },
    "/request/v1/closeRequest": {
      post: {
        tags: ["Request Management"],
        summary: "close the request",
        description: "close the request",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          },
          {
            name: "vBillImage",
            schema: {
              type: "file",
            },
            in: "formData",
          },
          {
            name: "vBillNo",
            schema: {
              type: "string",
            },
            in: "formData",
          },
          {
            name: "vVendorDetails",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "iRequestId",
            schema: {
              type: "integer",
            },
            in: "formData"
          }
        ],
        responses: {
          "200": {
            description: "close the request."
          }
        }
      }
    },
    "/system/v1/getInventoryList/:id": {
      get: {
        tags: ["System Management"],
        summary: "Get All Inventory List",
        description: "Get All Inventory List",
        produces: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "id",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular Inventory",
            // schema: {
            //   $ref: "#/definitions/getInventoryResModel"
            // }
          }
        }
      }
    },
    "/system/v1/addSystem": {
      post: {
        tags: ["System Management"],
        summary: "add System",
        description: "Add System",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "add System",
            in: "body",
            required: true,
            schema: {
              // required: [
              //   "vBillNo",
              //   "vAssetName",
              //   "iAssetType",
              //   "vWarrentyPeriod"
              // ],
              "$ref": "#/definitions/addSystemReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Add System Successfully",
            // schema: {
            //   $ref: "#/definitions/addInventoryResModel"
            // }
          }
        }
      }
    },
    "/system/v1/getAllSystem": {
      get: {
        tags: ["System Management"],
        summary: "Get all System",
        description: "Get all System",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "page",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "limit",
            schema: {
              type: "integer",
            },
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "List of All System"
          }
        }
      }
    },
    "/system/v1/getSystemById/{iSystemId}": {
      get: {
        tags: ["System Management"],
        summary: "Get All System",
        description: "Get All System",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iSystemId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular System"
          }
        }
      }
    },
    "/system/v1/updateSystem/{iSystemId}": {
      put: {
       tags: ["System Management"],
        summary: "Update System",
        description: "Update System",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iSystemId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
          {
            name: "Update",
            description: "update System",
            in: "body",
            required: true,
            schema: {
              "$ref": "#/definitions/updateSystemReqModel"
            },
          },
        ],
        responses: {
          "200": {
            description: "update system successfully"
          }
        }
      }
    },
    "/system/v1/deleteSystem/{iSystemId}": {
      delete: {
        tags: ["System Management"],
        summary: "delete System",
        description: "delete System",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iSystemId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "delete message "
          }
        }
      }
    },
    "/system/v1/dashboard": {
      get: {
        tags: ["System Management"],
        summary: "Get All System",
        description: "Get All System",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          }
        ],
        responses: {
          "200": {
            description: "List of Total Number system, Assigned and Unassigned system "
          }
        }
      }
    },
    "/system/v1/assignSystemtoUser": {
      post: {
        tags: ["System Management"],
        summary: "Assign System to user",
        description: "Assign System to user",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "Assign System to user",
            in: "body",
            required: true,
            schema: {
              required: [
                "vSystemUserId",
                "iSystemId",
                "startDate"
              ],
              "$ref": "#/definitions/assignSystemReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Add System to user",
            // schema: {
            //   $ref: "#/definitions/addInventoryResModel"
            // }
          }
        }
      }
    },
    "/system/v1/unassignSystem": {
      post: {
        tags: ["System Management"],
        summary: "Unassign System to user",
        description: "Unassign System to user",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "Unassign System to user",
            in: "body",
            required: true,
            schema: {
              required: [
                "vSystemUserId",
                "iSystemId",
              ],
              "$ref": "#/definitions/unassignSystemReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "Add System to user",
            // schema: {
            //   $ref: "#/definitions/addInventoryResModel"
            // }
          }
        }
      }
    },
    "/system/v1/systemHistory/{iSystemId}": {
      get: {
        tags: ["System Management"],
        summary: "Get System History",
        description: "Get System History",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iSystemId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the history of particular System"
          }
        }
      }
    },
    "/bill/v1/addBill": {
      post: {
        tags: ["Bill Management"],
        summary: "add Bill",
        description: "Add Bill",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          },
          {
            name: "vBillImage",
            schema: {
              type: "file",
            },
            in: "formData",
          },
          {
            name: "vBillNo",
            schema: {
              type: "string",
            },
            in: "formData",
          },
          {
            name: "vVendorDetails",
            schema: {
              type: "string",
            },
            in: "formData"
          },
        ],
        responses: {
          "200": {
            description: "Add Bill Message"
          }
        }
      }
    },
    "/bill/v1/getAllBill": {
      get: {
        tags: ["Bill Management"],
        summary: "Get all Bill",
        description: "Get all Bill",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "page",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "limit",
            schema: {
              type: "integer",
            },
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "List of All Bill"
          }
        }
      }
    },
    "/bill/v1/getBillById/{iBillId}": {
      get: {
        tags: ["Bill Management"],
        summary: "Get All Bill",
        description: "Get All Bill",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iBillId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular Bill"
          }
        }
      }
    },
    "/bill/v1/updateBill/{iBillId}": {
      put: {
       tags: ["Bill Management"],
        summary: "Update Bill",
        description: "Update Bill",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            // value: 'e6fae0dc47d77966b65364d9a6fe0519',
            type: "string"
          },
          {
            name: "vBillImage",
            schema: {
              type: "file",
            },
            in: "formData",
          },
          {
            name: "vVendorDetails",
            schema: {
              type: "string",
            },
            in: "formData"
          },
        ],
        responses: {
          "200": {
            description: "Update Bill Message"
          }
        }
      }
    },
    "/bill/v1/deleteBill/{iBillId}": {
      delete: {
        tags: ["Bill Management"],
        summary: "delete Bill",
        description: "delete Bill",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iBillId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "delete Bill message "
          }
        }
      }
    },
    "/iotMaster/v1/add": {
      post: {
        tags: ["Iot_Master Management"],
        summary: "add iot-type",
        description: "Add iot-type",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "Add ",
            description: "add iot-type",
            in: "body",
            required: true,
            schema: {
              required: [
                "vIotType"
              ],
              "$ref": "#/definitions/addIotReqModel"
            }
          }
        ],
        responses: {
          "200": {
            description: "add type ot iot device",
          }
        }
      }
    },
    "/iotMaster/v1/getAllIotAsset": {
      get: {
        tags: ["Iot_Master Management"],
        summary: "Get All iot-device",
        description: "Get All iot-device",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
        ],
        responses: {
          "200": {
            description: "Get all the type of iot-device.",
          }
        }
      }
    },
    "/iotMaster/v1/delete/{iIotId}": {
      delete: {
        tags: ["Iot_Master Management"],
        summary: "delete iot-device",
        description: "delete iot-device",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iIotId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "delete iot-device. "
          }
        }
      }
    },
    "/iotInventory/v1/addIotInventory": {
      post: {
        tags: ["Iot Inventory Management"],
        summary: "add iot-inventory",
        description: "Add iot-inventory",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "vBillImage",
            schema: {
              type: "file",
            },
            in: "formData",
          },
          {
            name: "iIotType",
            schema: {
              type: "string",
            },
            in: "formData",
          },
          {
            name: "vIotAssetName",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vBillNo",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vProjectName",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "EmployeeId",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vSerial_ModelNumber",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vBrandMaker",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "iPurchaseDate",
            schema: {
              type: "integer",
            },
            in: "formData"
          },
          {
            name: "vWarrentyPeriod",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "iExpiryDate",
            schema: {
              type: "integer",
            },
            in: "formData"
          },
          {
            name: "vComment",
            schema: {
              type: "text",
            },
            in: "formData"
          },
        ],
        responses: {
          "200": {
            description: "Add Iot-inventory Message"
          }
        }
      }
    },
    "/iotInventory/v1/getAllIotInventory": {
      get: {
        tags: ["Iot Inventory Management"],
        summary: "Get All Iot-Inventory",
        description: "Get All Iot-Inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "page",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "limit",
            schema: {
              type: "integer",
            },
            in: "query",
          },
          {
            name: "searchString",
            schema: {
              type: "string",
            },
            in: "query",
          },
        ],
        responses: {
          "200": {
            description: "List of Iot-Inventory"
          }
        }
      }
    },
    "/iotInventory/v1/getIotInventoryById/{iIotInventoryId}": {
      get: {
        tags: ["Iot Inventory Management"],
        summary: "Get iot device by id",
        description: "Get iot device by id",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iIotInventoryId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "get the list of particular iot-inventory device"
          }
        }
      }
    },
    "/iotInventory/v1/updateIotInventory/{iIotInventoryId}": {
      put: {
        tags: ["Iot Inventory Management"],
        summary: "Update iot-device",
        description: "Update iot-device",
        produces: ["application/json"],
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "vBillImage",
            schema: {
              type: "file",
            },
            in: "formData",
          },
          {
            name: "iIotType",
            schema: {
              type: "string",
            },
            in: "formData",
          },
          {
            name: "vIotAssetName",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vBillNo",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vProjectName",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "EmployeeId",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vSerial_ModelNumber",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "vBrandMaker",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "iPurchaseDate",
            schema: {
              type: "integer",
            },
            in: "formData"
          },
          {
            name: "vWarrentyPeriod",
            schema: {
              type: "string",
            },
            in: "formData"
          },
          {
            name: "iExpiryDate",
            schema: {
              type: "integer",
            },
            in: "formData"
          },
          {
            name: "vComment",
            schema: {
              type: "text",
            },
            in: "formData"
          },
        ],
        responses: {
          "200": {
            description: "Update particular iot device."
          }
        }
      }
    },
    "/iotInventory/v1/deleteIotInventory/{iIotInventoryId}": {
      delete: {
        tags: ["Iot Inventory Management"],
        summary: "delete iot-device",
        description: "delete iot-device",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "authorization",
            description: "authorization token",
            in: "header",
            required: true,
            type: "string"
          },
          {
            name: "iIotInventoryId",
            schema: {
              type: "integer",
            },
            in: "path",
          },
        ],
        responses: {
          "200": {
            description: "delete iot-device message "
          }
        }
      }
    },
  }
}
