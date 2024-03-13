'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('iot_master', {
        iIotId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vIotType: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        iCreatedAt: {
            type: Sequelize.INTEGER(10),
            allowNull: true
        },
        iUpdatedAt: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
        },
        tiDeletedAt: {
            type: Sequelize.TINYINT,  //1 as deleted 0 as not-deleted
            allowNull: true,
        },
    }, {
      tableName: 'iot_master',
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('iot_master');
  }
};
