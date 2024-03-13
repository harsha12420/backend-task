'use strict';
import {
    Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class UserDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserDetails.hasMany(models.System, { foreignKey: 'vEmployeeId' });
            UserDetails.hasMany(models.Request, { foreignKey: "vEmployeeId" });
            UserDetails.hasMany(models.SystemHistory, { foreignKey: "vEmployeeId" });
            UserDetails.hasMany(models.IotInventory, { foreignKey: 'vEmployeeId'});
        }
    }
    UserDetails.init({
        vEmployeeId: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
        },
        vDepartmentId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vDepartmentName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vDesignationId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vDesignationName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vEmailId: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        vFirstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vLastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vMobile: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vPhone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vReportingManagerName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vReportingManagerEmailId: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vStatus: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vType: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        vWorkLocation: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        dtCreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dtUpdatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'UserDetails',
        tableName: 'user_details',
        timestamps: false
    });
    return UserDetails;
};