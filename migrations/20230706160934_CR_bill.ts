'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bill', {
    iBillId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    vBillNo: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    vVendorDetails: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    iAddedBy: {
        type: Sequelize.INTEGER(50),
        allowNull: true
    },
    vBillImage: {
        type: Sequelize.STRING(200),
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
        type: Sequelize.TINYINT,  //1 as deleted 0 as not-deleted
        allowNull: true,
    },
    }, {
      tableName: 'bill',
      freezeTableName: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bill');
  }
};
