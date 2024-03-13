"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = await queryInterface.bulkInsert(
      "user",
      [
        {
          vEmployeeId: "SA-0382",
          vFirstName: "Pratik",
          vLastName: "Mistry",
          vEmailId: "pratik.mistry@solutionanalysts.com",
          vPhoneNo: "9999999999",
          txPassword:
            "$2b$10$3XykR1QyvzvGalKA.rGw4eiCqpW/jvi9i4W5wbBxyg/p7AliOKhUO", // Password : 123456789
          tiAccountStatus: 1,
          tiAccountType: 1, // Admin IT
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
