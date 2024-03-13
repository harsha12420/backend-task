'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('iot_inventory', {
        iIotInventoryId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          iIotType: {
            type: Sequelize.INTEGER(11),
            allowNull: true,
            references: {
              model: "iot_master", // Change to lowercase 'iot_master'
              key: "iIotId",
            },
          },
          vIotAssetName: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vBillNo: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vBillImage: {
            type: Sequelize.STRING(200),
            allowNull: true,
          },
          vProjectName: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vEmployeeId: {
            type: Sequelize.STRING(50),
            allowNull: true,
            references: {
              model: "user_details",
              key: "vEmployeeId",
            },
          },
          vSerial_ModelNumber: {
            type: Sequelize.STRING(150),
            allowNull: true,
          },
          vBrandMaker: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          iPurchaseDate: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
          },
          vWarrentyPeriod: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          iExpiryDate: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
          },   
          vComment: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          tiDeletedAt: {
            type: Sequelize.TINYINT, // 1 as deleted
            allowNull: true,
          },
          iCreatedAt: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
          },
          iUpdatedAt: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
          },
    }, {
      tableName: 'iot_inventory',
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('iot_inventory');
  }
};

