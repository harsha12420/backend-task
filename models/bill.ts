'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      Bill.hasMany(models.Inventory, { foreignKey: 'vBillNo' });
      Bill.hasOne(models.Request, { foreignKey: 'vBillNo' });
      Bill.belongsTo(models.User, {
        foreignKey: 'iAddedBy',
        targetKey: 'iUserId'
      });
    }
  }

  Bill.init(
    {
      iBillId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vBillNo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      vVendorDetails: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      iAddedBy: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "User",
          key: "iUerId",
        },
      },
      vBillImage: {
        type: DataTypes.STRING(200),
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
        type: DataTypes.TINYINT, // 1 as deleted, 0 as not-deleted
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Bill',
      tableName: 'bill',
      timestamps: false,
      paranoid: true,
    }
  );

  return Bill;
};
