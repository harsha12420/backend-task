'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('request', {
        iRequestId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          vBillNo: {
            type: Sequelize.STRING(20),
            allowNull: true,
          },
          vEmployeeId: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          iDeviceType: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
          },
          vDeviceInfo: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          bIsAccept: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          bIsReject: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false,
          },
          bIsPending: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true,
          },
          bIsClosed: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false,
          },
          txRejectReason: {
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
          tiDeletedAt: {
            type: Sequelize.TINYINT,  //1 as deleted
            allowNull: true,
          },
    }, {
      tableName: 'request',
      freezeTableName: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('request');
  }
};
