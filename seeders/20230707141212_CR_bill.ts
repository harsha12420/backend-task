"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let bill = await queryInterface.bulkInsert(
      "bill",
      [
        {
          vBillNo: "SI/EH/APR22/2930",
          vVendorDetails: "Pratik Mistry",
          iAddedBy: 4,
          vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
          iCreatedAt: 1692351538,
          iUpdatedAt: 1692351538,
        },
        {
            vBillNo: "SI/EH/JUL22/2667",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SN220508916208",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SN220508916207",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SN220508916205",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SO/EH/MAR19/2134",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/MAR19/3108",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/MAR19/0119",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: " SI/EH/SEP20/0385",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/JUN19/3144",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: " SI/EH/DEC19/5841",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/JUL19/4213",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/MAY19/4147",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/DEC19/5841",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/SEP20/0385",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "UIPLA 192001766",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "UIH 192001921",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "GST/618/22-23",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/APR19/3598",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/JUL19/1016",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/NOV19/0854",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/AGU19/2436",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/AUG20/0002",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "IN-AMD2-1236346",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "IN-DEL5-4007337",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "IN-DEL5-4007388",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },

          {
          vBillNo: "SI/EH/NOV21/0375",
          vVendorDetails: "Pratik Mistry",
          iAddedBy: 4,
          vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
          iCreatedAt: 1692351538,
          iUpdatedAt: 1692351538,
        },{
            vBillNo: "SI/EH/JAN22/3081",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "INV/21-22/997",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/APR22/1475",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/APR22/3754",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/MAY22/1969",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "AMD2-811875",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "BOM7-422586",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EB/AUG22/0176",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "3I/2022/23-0024",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "3I/2022/23-0023",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "3I/2022/23-0044",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/OCT22/0225",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/OCT22/1711",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "3I/2022/23-0092",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/OCT22/2230",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "1012",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/JAN23/2116",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/FEB23/3395",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/MAR23/0709",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/APR23/1383",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/APR22/2392",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SN220508916215",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "NA",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/AUG19/0196",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/DEC19/5838",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/JUN20/3782",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "SI/EH/JUL20/5004",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "UIPLA212200345",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "UIPLA202102226",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "UIPLA202100499",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "9725198547",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "226",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "299",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "528",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "598",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "GST/103/22-23",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "GST/168/22-23",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "GST/644/22-23",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
          {
            vBillNo: "GST/647/22-23",
            vVendorDetails: "Pratik Mistry",
            iAddedBy: 4,
            vBillImage: "https://media-inventory-beckend.s3.amazonaws.com/staging/bills/SI/EH/APR22/293.jpg",
            iCreatedAt: 1692351538,
            iUpdatedAt: 1692351538,
          },
      ],
      {}
    );
  },  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bill", null, {});
  },
};
