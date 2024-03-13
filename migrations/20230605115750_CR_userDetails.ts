'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_details', {
        vEmployeeId: {
            type: Sequelize.STRING(50),
            allowNull: false,
            primaryKey: true,
        },
        vDepartmentId: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vDepartmentName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vDesignationId: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vDesignationName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vEmailId: {
            type: Sequelize.STRING(70),
            allowNull: false,
        },
        vFirstName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vLastName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vMobile: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vPhone: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vReportingManagerName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vReportingManagerEmailId: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vStatus: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vType: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        vWorkLocation: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        dtCreatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        dtUpdatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }, {
      tableName: 'user_details',
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_details');
  }
};