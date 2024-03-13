'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('asset', {
      iAssetId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      vAssetType:{
        type: Sequelize.STRING(150),
        allowNull: true
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
        type: Sequelize.TINYINT,  //1 as deleted
        allowNull: true,
      },
    }, {
      tableName: 'asset',
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('asset');
  }
};