'use strict';
import {
    Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Asset extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Asset.hasMany(models.Inventory, { foreignKey: 'iAssetType'});
            Asset.hasMany(models.Request, { foreignKey: 'iDeviceType'});
        }
    }
    Asset.init({
        iAssetId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vAssetType: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        dtCreatedAt: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        dtUpdatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tiDeletedAt: {
            type: DataTypes.TINYINT,  //1 as deleted 0 as not-deleted
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Asset',
        tableName: 'asset',
        timestamps: false,
        paranoid: true,
    });
    return Asset;
};
