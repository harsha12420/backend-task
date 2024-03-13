export default class SwaggerDefinitions {
  definitions = {
    loginReqModel: {
      properties: {
        vEmailId: {
          type: "string"
        },
        tiAccountType: {
          type: "integer"
        },
        tiAccountStatus: {
          type: "integer"
        },
        txPassword: {
          type: "string"
        }
      }
    },
    loginRes: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "object",
        }
      }
    },
    forgotPasswordReqModel: {
      properties: {
        vEmailId: {
          type: "string"
        },
      }
    },
    resetPasswordReqModel: {
      properties: {
        iUserId: {
          type: "integer"
        },
        txPassword: {
          type: "string"
        }
      }
    },
    forgotPasswordRes: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "object",
        }
      }
    },
    resetPasswordRes: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "object",
        }
      }
    },
    userListRes: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "array",
          $ref: "#/definitions/userListResdata"
        }
      }
    },
    userListResdata: {
      properties: {
        iUserId: {
          type: "integer"
        },
        vFirstName: {
          type: "string"
        },
        vLastName: {
          type: "string"
        },
        vEmailId: {
          type: "string"
        }
      }
    },
    addInventoryReqModel: {
      properties: {
        vBillNo: {
          type: "string"
        },
        iAssetType: {
          type: "integer"
        },
        vAssetName: {
          type: "string"
        },
        // vRam: {
        //   type: "string"
        // },
        // vSerialNumber: {
        //   type: "string"
        // },
        // vBrandMaker: {
        //   type: "string"
        // },
        // vRate: {
        //   type: "string"
        // },
        // dtPurchaseDate: {
        //   type: "string"
        // },
        vWarrentyPeriod: {
          type: "string"
        },
        // dtExpiryDate: {
        //   type: "date"
        // },
        // vMotherBoard: {
        //   type: "string"
        // },
        // vStorage: {
        //   type: "string"
        // },
        // vProcessor: {
        //   type: "string"
        // },
        // vOS: {
        //   type: "string"
        // }
      }
    },
    assignInventoryReqModel:{
      properties: {
        vInventoryUserId: {
          type: "string"
        },
        iInventoryId: {
          type: "integer"
        },
        tiInventoryFlag: {
          type: "boolean"
        },
        startDate: {
          type: "string",
          format: "date-time",
        },
        endDate: {
          type: "string",
          format: "date-time",
        }
      },
    },
    unassignInventoryReqModel: {
      properties: {
        vInventoryUserId: {
          type: "string"
        },
        iInventoryId: {
          type: "integer"
        }
      }
    },
    addInventoryResModel: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "array",
          $ref: "#/definitions/inventoryListResdata"
        }
      }
    },
    addSystemReqModel: {
      properties: {
        system_name: {
          type: "string"
        },
        ram: {
          type: "integer"
        },
        motherboard: {
          type: "integer"
        }
      }
    },
    updateSystemReqModel:{
      properties: {
        system_name: {
          type: "string"
        },
        ram: {
          type: "integer"
        },
        motherboard: {
          type: "integer"
        }
      }
    },
    assignSystemReqModel:{
      properties: {
      vSystemUserId: {
        type: "string"
      },
      iSystemId: {
        type: "integer"
      },
      startDate: {
        type: "string",
        format: "date-time",
      }
    },
    },
     unassignSystemReqModel:{
      properties: {
      vSystemUserId: {
        type: "string"
      },
      iSystemId: {
        type: "integer"
      }
    },
    },
    addSystemResModel: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "array",
          $ref: "#/definitions/systemListResdata"
        }
      }
    },
    systemListResdata: {
      properties: {
        iSystemId: {
          type: "integer"
        },
        vEmployeeId: {
          type: "string"
        },
        vSystemName: {
          type: "string"
        },
        vSystemAssignStartDate: {
          type: "string",
          format: "date-time",
        },
        vSystemAssignEndDate: {
          type: "string",
          format: "date-time",
        },
      }
    },
    inventoryListResdata: {
      properties: {
        vBillNo: {
          type: "string"
        },
        iAssetType: {
          type: "integer"
        },
        vAssetName: {
          type: "string"
        },
        vWarrentyPeriod: {
          type: "string"
        },
        dtCreatedAt: {
          type: "date"
        },
        dtUpdatedAt: {
          type: "date"
        }
      }
    },
    getInventoryResModel: {
      properties: {
        iInventoryId: {
          type: "integer"
        },
        vBillNo: {
          type: "string"
        },
        vAssetName: {
          type: "string"
        },
        vWarrentyPeriod: {
          type: "string"
        },
        dtCreatedAt: {
          type: "string"
        },
        dtUpdatedAt: {
          type: "string"
        },
      }
    },
    updateInventoryReqModel: {
      properties: {
        vBillNo: {
          type: "string"
        },
        iAssetType: {
          type: "integer"
        },
        vAssetName: {
          type: "string"
        },
        vRam: {
          type: "string"
        },
        vSerialNumber: {
          type: "string"
        },
        vBrandMaker: {
          type: "string"
        },
        vRate: {
          type: "string"
        },
        dtPurchaseDate: {
          type: "string"
        },
        vWarrentyPeriod: {
          type: "string"
        },
        dtExpiryDate: {
          type: "date"
        },
        vMotherBoard: {
          type: "string"
        },
        vStorage: {
          type: "string"
        },
        vProcessor: {
          type: "string"
        },
        vOS: {
          type: "string"
        }
      }
    },
    addAssetReqModel: {
      properties: {
        iAssetId: {
          type: "integer"
        },
        iAssetType: {
          type: "string"
        }
      }
    },
    getAssetResModel: {
      properties: {
        iAssetId: {
          type: "integer"
        },
        vAssetType: {
          type: "string"
        },
        dtCreatedAt: {
          type: "string"
        },
        dtUpdatedAt: {
          type: "string"
        },
      }
    },
    updateAssetReqModel: {
      properties: {
        vAssetType: {
          type: "string"
        }
      }
    },
    addReqModel: {
      properties: {
        vUserId: {
          type: "string"
        },
        iDeviceType: {
          type: "string"
        },
        vDeviceInfo: {
          type: "string"
        }
      }
    },
    addRequestResModel: {
      properties: {
        code: {
          type: "integer"
        },
        message: {
          type: "string"
        },
        data: {
          type: "array",
          $ref: "#/definitions/RequestResdata"
        }
      }
    },
    RequestResdata: {
      properties: {
        vBillNo: {
          type: "string"
        },
        iAssetType: {
          type: "integer"
        },
        vAssetName: {
          type: "string"
        },
        vWarrentyPeriod: {
          type: "string"
        },
        dtCreatedAt: {
          type: "date"
        },
        dtUpdatedAt: {
          type: "date"
        }
      }
    },
    updateAcceptRejectReqModel:{
      properties: {
        bIsAccept: {
          type: "boolean"
        },
        txRejectReason: {
          type: "text"
        }
      }
    },
    changePasswordReqModel: {
      properties: {
        oldPassword: {
          type: "string"
        },
        newPassword: {
          type: "string"
        },
        confirmPassword: {
          type: "string"
        }
      }
    },
    logoutReqModel: {
      properties: {
        token: {
          type: "string"
        }
      }
    },
    updateProfileReqModel: {
      properties: {
        vImageUrl: {
          type: "file"
        },
        vFirstName: {
          type: "string"
        },
        vLastName: {
          type: "string"
        }
      }
    },
    addIotReqModel: {
      properties: {
        vIotType: "string"
      } 
    }
  }
}


