'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint('user', {
          type: 'foreign key',
          fields: ['vEmployeeId'],
          references: {
            table: 'user_details',
            field: 'vEmployeeId'
          }
      })
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('user', 'vEmployeeId')
    ]);
  }
};