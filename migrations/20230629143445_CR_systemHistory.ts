"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "system_history",
      {
        iSystemHistoryId: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        iSystemId: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
        },
        vEmployeeId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        vAssignComment: {
          type: Sequelize.TEXT,
          allowNull : true,
        },
        iSystemDate: {
          type: Sequelize.INTEGER(10),
          allowNull: true
        },
        tiSystemFlag: {
            type: Sequelize.TINYINT(1),
            allowNull: false    // 0 - Unassigned , 1- Assigned
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
        tableName: "system_history",
        freezeTableName: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("system_history");
  },
};
