'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class System extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      System.belongsTo(models.UserDetails, {
        foreignKey: 'vEmployeeId',
        targetKey: 'vEmployeeId'
      });
      System.belongsTo(models.Inventory, {
        foreignKey: 'iSystemId',
        targetKey: 'iSystemId'
      })
    }
  }
  System.init({
    iSystemId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vEmployeeId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: "UserDetails",
        key: "vEmployeeId",
      },
    },
    vAssignComment: {
      type: DataTypes.TEXT,
      allowNull : true,
    },
    vSystemName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    vSystemAssignStartDate: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    vSystemAssignEndDate: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    iCreatedAt: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    iUpdatedAt: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    tiDeletedAt: {
      type: DataTypes.TINYINT, // 1 as deleted, 0 as not-deleted
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'System',
    tableName: 'system',
    timestamps: false
  });
  return System;
};