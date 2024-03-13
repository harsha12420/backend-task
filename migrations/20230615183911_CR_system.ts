"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "system",
      {
        iSystemId: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        vEmployeeId: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        vAssignComment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        vSystemName: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        vSystemAssignStartDate: {
          type: Sequelize.INTEGER(10),
          allowNull: false
        },
        vSystemAssignEndDate: {
          type: Sequelize.INTEGER(10),
          allowNull: true
        },
        iCreatedAt: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        iUpdatedAt: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
        },
        tiDeletedAt: {
          type: Sequelize.TINYINT, // 1 as deleted, 0 as not-deleted
          allowNull: true,
        },
      },
      {
        tableName: "system",
        freezeTableName: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("system");
  },
};
