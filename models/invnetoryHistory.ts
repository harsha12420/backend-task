    'use strict';
    import {
        Model
    } from 'sequelize';
    module.exports = (sequelize, DataTypes) => {
        class InventoryHistory extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                InventoryHistory.belongsTo(models.UserDetails, {foreignKey: 'vEmployeeId'});
            }
        }
        InventoryHistory.init({
            iInventoryHistoryId: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            iInventoryId: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                references: {
                    model: "Inventory",
                    key: "iInventoryId",
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
            iInventoryDate: {
                type: DataTypes.INTEGER(10),
                allowNull: true
            },
            tiInventoryFlag: {
                type: DataTypes.TINYINT(1),
                allowNull: false    // 0 - Unassigned , 1- Assigned , 2 - trash , 3 - repair
            },
            vRepairComment: {
                type: DataTypes.TEXT,
                allowNull : true,
              },
            vAssignComment: {
                type: DataTypes.TEXT,
                allowNull : true,
            },
            iCreatedAt: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
            iUpdatedAt: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'InventoryHistory',
            tableName: 'inventory_history',
            timestamps: false
        });
        return InventoryHistory;
    };