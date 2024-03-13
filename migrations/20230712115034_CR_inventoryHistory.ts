"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "inventory_history",
      {
        iInventoryHistoryId: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        iInventoryId: {
          type: Sequelize.INTEGER(11),
          allowNull: true,
        },
        vEmployeeId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        iInventoryDate: {
          type: Sequelize.INTEGER(10),
          allowNull: true
        },
        tiInventoryFlag: {
          type: Sequelize.TINYINT(1),
          allowNull: false    // 0 - Unassigned , 1- Assigned , 2 - trash , 3 - repair
        },
        vRepairComment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        vAssignComment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        iCreatedAt: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        iUpdatedAt: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
      },
      {
        tableName: "inventory_history",
        freezeTableName: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("inventory_history");
  },
};
