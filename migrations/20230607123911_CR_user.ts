"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "user",
      {
        iUserId: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        vEmployeeId: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        vImageUrl: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        vFirstName: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        vLastName: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        vEmailId: {
          type: Sequelize.STRING(70),
          allowNull: false,
        },
        vPhoneNo: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        txPassword: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        tiAccountStatus: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 1,
        },
        tiAccountType: {
          type: Sequelize.INTEGER(2),
          allowNull: false,
        },
        txAccessToken: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        txEmailToken: {
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
        tableName: "user",
        freezeTableName: true,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  },
};
