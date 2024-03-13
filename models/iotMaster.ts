'use strict';
import {
    Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class IotMaster extends Model {
        static associate(models) {
            IotMaster.hasMany(models.IotInventory, { foreignKey: 'iIotType'});
        }
    }
    IotMaster.init({
        iIotId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vIotType: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        iCreatedAt: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        iUpdatedAt: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        tiDeletedAt: {
            type: DataTypes.TINYINT,  //1 as deleted 0 as not-deleted
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'IotMaster',
        tableName: 'iot_master',
        timestamps: false,
        paranoid: true,
        deletedAt: 'tideletedAt', // Specify the column for soft deletion
    });
    return IotMaster;
};