'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint('request', {
        type: 'foreign key',
        fields: ['iDeviceType'],
        references: {
          table: 'asset',
          field: 'iAssetId'
        }
      }),

      await queryInterface.addConstraint('request', {
        type: 'foreign key',
        fields: ['vEmployeeId'],
        onDelete: 'CASCADE',
        references: {
          table: 'user_details',
          field: 'vEmployeeId'
        }
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('request', 'iDeviceType');
    await queryInterface.removeConstraint('request', 'vEmployeeId')
    
  }
};
