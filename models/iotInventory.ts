'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class IotInventory extends Model {
    static associate(models) {
        IotInventory.belongsTo(models.IotMaster, { foreignKey: 'iIotType' }); // Change to lowercase 'iot_master'
        IotInventory.belongsTo(models.UserDetails, { foreignKey: 'vEmployeeId' }); // Change to lowercase 'user_details'
    }
  }

  IotInventory.init(
    {
      iIotInventoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      iIotType: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "iot_master",
          key: "iIotId",
        },
      },
      vIotAssetName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vBillNo: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vBillImage: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      vProjectName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vEmployeeId: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
            model: "UserDetails",
            key: "vEmployeeId",
          },
      },
      vSerial_ModelNumber: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      vBrandMaker: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      iPurchaseDate: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      vWarrentyPeriod: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      iExpiryDate: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },   
      vComment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tiDeletedAt: {
        type: DataTypes.TINYINT, // 1 as deleted
        allowNull: true,
      },
      iCreatedAt: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      iUpdatedAt: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'IotInventory',
      tableName: 'iot_inventory',
      timestamps: false,
      paranoid: true, // Enable soft deletion
      deletedAt: 'tideletedAt', // Specify the column for soft deletion
    }
  );

  return IotInventory;
};
