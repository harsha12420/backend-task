'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.UserDetails, {foreignKey: 'vEmployeeId'});
      User.hasMany(models.Bill, { foreignKey: 'iAddedBy', sourceKey: 'iUserId'});
    }
  }
  User.init({
    iUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vEmployeeId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: "UserDetails",
        key: "vEmployeeId",
      },
    },
    vFirstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    vLastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    vImageUrl: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    vEmailId: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    vPhoneNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    txPassword: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tiAccountStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    tiAccountType: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    txAccessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    txEmailToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    iCreatedAt: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    iUpdatedAt: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
  });
  return User;
};