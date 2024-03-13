"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let asset = await queryInterface.bulkInsert(
      "asset",
      [
        {
          iAssetId: "1",
          vAssetType: "laptop",
          dtCreatedAt: "2023-06-15 11:40:43",
          dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "2",
            vAssetType: "mouse",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "3",
            vAssetType: "keyboard",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "4",
            vAssetType: "motherboard",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "5",
            vAssetType: "headphone",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "6",
            vAssetType: "monitor",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "7",
            vAssetType: "webcam",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "8",
            vAssetType: "mobile",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "9",
            vAssetType: "ram",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "10",
            vAssetType: "ssd",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "11",
            vAssetType: "pendrive",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "12",
            vAssetType: "TV",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "13",
            vAssetType: "projector",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "14",
            vAssetType: "smps",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "15",
            vAssetType: "other",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "16",
            vAssetType: "processor",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "17",
            vAssetType: "macmini",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        },
        {
            iAssetId: "18",
            vAssetType: "macbook",
            dtCreatedAt: "2023-06-15 11:40:43",
            dtUpdatedAt: "2023-06-15 11:40:43",
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("asset", null, {});
  },
};
