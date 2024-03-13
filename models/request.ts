'use strict';
import { Model } from 'sequelize';

  module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
      static associate(models) {
        Request.belongsTo(models.Bill, {
          foreignKey: 'vBillNo',
          targetKey: 'vBillNo',
          constraints: false, // Disable constraint for nullable foreign key
        });
        Request.belongsTo(models.Asset, { foreignKey: 'iDeviceType' });
        Request.belongsTo(models.UserDetails, { foreignKey: 'vEmployeeId' });
      }
    }

  Request.init(
    {
      iRequestId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vBillNo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: 'Bill',
          key: 'vBillNo',
        },
      },
      vEmployeeId: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "UserDetails",
          key: "vEmployeeId",
        },
      },
      iDeviceType: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      vDeviceInfo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bIsAccept: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bIsReject: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bIsPending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      bIsClosed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      txRejectReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      iCreatedAt: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      iUpdatedAt: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      tiDeletedAt: {
        type: DataTypes.TINYINT, // 1 as deleted
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Request',
      tableName: 'request',
      timestamps: false,
    }
  );

  return Request;
};
