"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let admin = await queryInterface.bulkInsert(
      "user",
      [
        {
          vEmployeeId: "SA-0521",
          vFirstName: "SA",
          vLastName: "User",
          vEmailId: "gayatri.parmar.sa@gmail.com",
          vPhoneNo: "9999999999",
          txPassword:
            "$2b$10$3XykR1QyvzvGalKA.rGw4eiCqpW/jvi9i4W5wbBxyg/p7AliOKhUO", // Password : 123456789
          tiAccountStatus: 1,
          tiAccountType: 1,
          iCreatedAt: 1687321648,
          iUpdatedAt: 1687321648,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
