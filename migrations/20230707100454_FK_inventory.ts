'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint('inventory', {
          type: 'foreign key',
          fields: ['vBillNo'],
          onDelete: 'CASCADE',
          references: {
            table: 'bill',
            field: 'vBillNo'
          }
      }),
      await queryInterface.addConstraint('inventory', {
        type: 'foreign key',
        fields: ['iAssetType'],
        onDelete: 'CASCADE',
        references: {
          table: 'asset',
          field: 'iAssetId'
        }
      }),
      await queryInterface.addConstraint('inventory', {
        type: 'foreign key',
        fields: ['vAssetUser'],
        references: {
          table: 'user_details',
          field: 'vEmployeeId'
        }
      }),
      await queryInterface.addConstraint('inventory', {
        type: 'foreign key',
        fields: ['iSystemId'],
        onDelete: 'CASCADE',
        references: {
          table: 'system',
          field: 'iSystemId'
        }
      }),
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('inventory', 'vBillNo'),
      await queryInterface.removeConstraint('inventory', 'iAssetType'),
      await queryInterface.removeConstraint('inventory', 'vAssetUser'),
      await queryInterface.removeConstraint('inventory', 'iSystemId')
    ]);
  }
};