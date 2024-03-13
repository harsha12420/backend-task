"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = await queryInterface.bulkInsert(
      "user",
      [
        {
          vEmployeeId: "SA-0368",
          vFirstName: "Bhavesh",
          vLastName: "Patel",
          vEmailId: "bhavesh.patel@solutionanalysts.com",
          vPhoneNo: "9999999999",
          txPassword:
            "$2b$10$3XykR1QyvzvGalKA.rGw4eiCqpW/jvi9i4W5wbBxyg/p7AliOKhUO", // Password : 123456789
          tiAccountStatus: 1,
          tiAccountType: 2, // sales
          iCreatedAt: 1686130965,
          iUpdatedAt: 1686130965,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
