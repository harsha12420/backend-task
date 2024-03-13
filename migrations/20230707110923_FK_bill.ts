'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint('bill', {
        type: 'foreign key',
        fields: ['iAddedBy'], 
        onDelete: 'CASCADE',
        references: {
          table: 'user',
          field: 'iUserId'
        }
      })
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint('bill', 'iAddedBy') 
    ]);
  }
};
