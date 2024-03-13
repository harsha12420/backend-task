'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.Bill, { foreignKey: 'vBillNo',
        targetKey: 'vBillNo', // Specify the target key in the Bill model
      });
      Inventory.belongsTo(models.Asset, { foreignKey: 'iAssetType' });
      Inventory.belongsTo(models.UserDetails, { foreignKey: "vAssetUser" });
      Inventory.belongsTo(models.System, { foreignKey: "iSystemId"});
    }
  }

  Inventory.init(
    {
      iInventoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vBillNo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: 'Bill', // Replace with the correct model name for bills
          key: 'vBillNo',
        },
      },
      iAssetType: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "Asset",
          key: "iAssetType",
        },
      },
      vAssetName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      vAssetUser: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      iSystemId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "System",
          key: "iSystemId",
        },
      },
      vRam: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vSerialNumber: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      bIsTrash: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bIsRepair: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      vRepairComment: {
        type: DataTypes.TEXT,
        allowNull : true,
      },
      vAssignComment: {
        type: DataTypes.TEXT,
        allowNull : true,
      },
      vBrandMaker: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vRate: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      dtPurchaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vWarrentyPeriod: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      dtExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vMotherBoard: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vStorage: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vProcessor: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vOS: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vLanMacAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vWifiMacAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vComment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dtCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dtUpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tiDeletedAt: {
        type: DataTypes.TINYINT, // 1 as deleted
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Inventory',
      tableName: 'inventory',
      timestamps: false,
      paranoid: true, // Enable soft deletion
      deletedAt: 'dtdeletedAt', // Specify the column for soft deletion
    }
  );

  return Inventory;
};
