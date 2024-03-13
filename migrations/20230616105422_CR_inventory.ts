'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory', {
        iInventoryId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          vBillNo: {
            type: Sequelize.STRING(20),
            allowNull: false,
          },
          iAssetType:{
            type: Sequelize.INTEGER(11),
            allowNull: true
          },
          vAssetName:{
              type: Sequelize.STRING(50),
              allowNull: false
          },
          vAssetUser:{
            type: Sequelize.STRING(50),
            allowNull: true
          },
          iSystemId: {
            type: Sequelize.INTEGER(11),
            allowNull: true
          },
          vRam:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          vSerialNumber:{
              type: Sequelize.STRING(150),
              allowNull: true
          },
          bIsTrash: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          bIsRepair: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          vRepairComment: {
            type: Sequelize.TEXT,
            allowNull : true,
          },
          vAssignComment: {
            type: Sequelize.TEXT,
            allowNull : true,
          },
          vBrandMaker:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          vRate:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          dtPurchaseDate:{
              type: Sequelize.DATE,
              allowNull: true
          },
          vWarrentyPeriod :{
              type: Sequelize.STRING(50),
              allowNull: false
          },
          dtExpiryDate:{
              type: Sequelize.DATE,
              allowNull: true
          },
          vMotherBoard:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          vStorage:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          vProcessor:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          vOS:{
              type: Sequelize.STRING(50),
              allowNull: true
          },
          vLanMacAddress: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vWifiMacAddress: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vComment: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          dtCreatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          dtUpdatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          tiDeletedAt: {
            type: Sequelize.TINYINT,  //1 as deleted 0 as not-deleted
            allowNull: true,
          },
    }, {
      tableName: 'inventory',
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inventory');
  }
};