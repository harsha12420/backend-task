'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        await queryInterface.addConstraint('iot_inventory', {
            type: 'foreign key',
            fields: ['iIotType'],
            onDelete: 'CASCADE',
            references: {
              table: 'iot_master',
              field: 'iIotId'
            }
          }),
          await queryInterface.addConstraint('iot_inventory', {
            type: 'foreign key',
            fields: ['vEmployeeId'],
            references: {
              table: 'user_details',
              field: 'vEmployeeId'
            }
          }),
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('iot_inventory', 'iIotType'),
      await queryInterface.removeConstraint('iot_inventory', 'vEmployeeId')
    ]);
  }
};
