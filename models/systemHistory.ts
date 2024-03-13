'use strict';
import {
    Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class SystemHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SystemHistory.belongsTo(models.UserDetails, { foreignKey: 'vEmployeeId' });
        }
    }
    SystemHistory.init({
        iSystemHistoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        iSystemId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: "System",
                key: "iSystemId",
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
        iSystemDate: {
            type: DataTypes.INTEGER(10),
            allowNull: true
        },
        tiSystemFlag: {
            type: DataTypes.TINYINT(1),
            allowNull: false    // 0 - Unassigned , 1- Assigned
        },
        vAssignComment: {
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
    }, {
        sequelize,
        modelName: 'SystemHistory',
        tableName: 'system_history',
        timestamps: false
    });
    return SystemHistory;
};