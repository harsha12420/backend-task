import cron from "node-cron";
require("dotenv").config();
import axios from "axios";
import moment from "moment";
import commonHelper from './helpers/CommonController';
const {
  getEpoch,
} = new commonHelper();
const models = require('./models/index');

export class Cron {
  public async initCron() {
    const timeZone = "Asia/Kolkata";
    cron.schedule(
      "0 0 * * *",
      async () => {
        try {
          console.log("Cron Started");
          await this.checkUnassignSystemCron();
          await this.getAccessToken(); 
          await this.insertUserData();
        } catch (error) {
          console.log("Cron error", error);
        }
      },
      {
        scheduled: true,
        timezone: timeZone,
      }
    );
  } 

  async checkUnassignSystemCron() {
    try {
      const response = await models.sequelize.query(`SELECT * FROM system_history where date_format(from_unixtime(iSystemDate), '%Y-%m-%d') = CURDATE() and tiSystemFlag = 0`)
      for (const item of response[0]) {
        await this.unassignSystemQuery(item);
      }
    } catch (error) {
      console.log("checkUnassignSystemCron error-------------",error);
    }
  }

  async unassignSystemQuery(body: any) {
    try {
      models.System.update({ vEmployeeId: null, iUpdatedAt: await getEpoch() }, { where: { iSystemId: body.iSystemId } });
      models.Inventory.update({ vAssetUser: null, iSystemId: null, dtUpdatedAt: new Date() }, { where: { iSystemId: body.iSystemId } });
      models.SystemHistory.update({ iUpdatedAt: await getEpoch() }, { where: { iSystemHistoryId: body.iSystemHistoryId } })
    } catch (error) {
      console.log("unassign system query error-------", error);
    }
  }

  async insertUserData() {
    try {
      const accessToken = await this.getAccessToken();
      console.log(accessToken, "accessToken");
  
      if (!accessToken) {
        throw new Error("Error: Failed to obtain access token.");
      }
  
      const apiUrl = "https://people.zoho.com/people/api/forms/employee/getRecords";
      const batchSize = 200;
  
      const headers = {
        "Authorization": 'Zoho-oauthtoken ' + accessToken,
        "Accept": "application/json",
      };
  
      // Disable foreign key constraints before data deletion
      await models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  
      // Use TRUNCATE to delete data from UserDetails
      await models.sequelize.query("TRUNCATE TABLE user_details");
  
      // Enable foreign key constraints before data insertion
      await models.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  
      let sIndex = 1;
      let totalCount = 0;
  
      while (true) {
        // Fetch data for the current batch
        const response = await axios.get(`${apiUrl}?sIndex=${sIndex}&limit=${batchSize}`, { headers });
  
        if (!response || !response.data || !response.data.response) {
          console.log("Invalid API Response:", response);
          throw new Error("Error: Invalid API response or missing data.");
        }
  
        if (response.data.response.status === 1) {
          if (response.data.response.errors.code === 7024) {
            console.log("No more records found. Data fetching completed.");
            break;
          } else {
            console.log("API Error:", response.data.response.errors);
            throw new Error("Error: API returned an error.");
          }
        }
  
        const employeeData = response.data.response.result;
        console.log(`Fetched ${employeeData.length} records for batch starting at index ${sIndex}`);
  
        if (employeeData.length === 0) {
          break;
        }
  
        for (const dataObject of employeeData) {
          const zohoId = Object.keys(dataObject)[0];
          const employeeInfo = dataObject[zohoId][0];
  
          await models.UserDetails.create({
            vEmployeeId: employeeInfo.EmployeeID,
            vDepartmentId: employeeInfo["Department.ID"],
            vDepartmentName: employeeInfo.Department,
            vDesignationId: employeeInfo["Designation.ID"],
            vDesignationName: employeeInfo.Designation,
            vEmailId: employeeInfo.EmailID,
            vFirstName: employeeInfo.FirstName,
            vLastName: employeeInfo.LastName,
            vMobile: employeeInfo.Mobile,
            vPhone: employeeInfo.Work_phone,
            vReportingManagerName: employeeInfo.Reporting_To,
            vReportingManagerEmailId: employeeInfo["Reporting_To.MailID"],
            vStatus: employeeInfo.Employeestatus,
            vType: employeeInfo.Employee_type,
            vWorkLocation: employeeInfo.Work_location,
            dtCreatedAt: new Date(),
            dtUpdatedAt: new Date(),
          });
        }
  
        totalCount += employeeData.length;
        sIndex += batchSize;
      }
  
      console.log(`User data inserted successfully. Total records inserted: ${totalCount}`);
    } catch (error) {
      console.error("Error inserting user data:", error);
      throw error;
    }
  }
  
  


  async getAccessToken() {
    try {
      const refreshToken = "1000.4d72bd45d9ac375bd6e984f7f889f07b.5e9407ab230312ae4fe4b67204b2df90";

      const tokenApiUrl = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=1000.AGK70IGPZNVL3GSGLMMG6KYL93C29G&client_secret=c73e89ee87245d03a94c6ac09ff25528b8de34e6d3&grant_type=refresh_token`;
      const response = await axios.post(tokenApiUrl);

      return response.data.access_token;
    } catch (error) {
      throw new Error("Error obtaining access token: " + error.message);
    }
  }

}
