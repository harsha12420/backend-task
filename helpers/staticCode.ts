'use strict';

export const paths = {
  development:{
    BASE_URL_NODEJS: 'https://api-inventory-dev.solutionanalysts.us',
    BASE_URL: 'http://localhost:4200',

    // Bill upload
    BILL_BUCKET: 'development/bills/',

    //User Profile Upload
    USER_PROFILE_BUCKET: 'development/userProfile/',

    //Iot device bill upload
    IOT_DEVICE_BILL_BUCKET: 'development/iotBills/'
  },
  staging: {
    BASE_URL_NODEJS: 'https://api-inventory-stage.solutionanalysts.us',
    BASE_URL: 'https://inventory-stage.solutionanalysts.us',

    // Bill upload
    BILL_BUCKET: 'staging/bills/',

     //User Profile Upload
    USER_PROFILE_BUCKET: 'staging/userProfile/',

    //Iot device bill upload
    IOT_DEVICE_BILL_BUCKET: 'staging/iotBills/'
  },
  production: {
    
  }
}