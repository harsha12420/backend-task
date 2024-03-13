
import * as bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { HttpCodes } from "../helpers/responseCodes";
import { extname } from "path";
import { paths } from './../helpers/staticCode';
import { stEmail } from './../helpers/staticEmailCode ';
import commonHelper from '../helpers/CommonController';
import { Op } from "sequelize";
var sequelize = require("sequelize");

const {
  getEpoch,
  generateToken,
  SendEmail,
  uploadS3Image
} = new commonHelper();
const models = require("./../models/index");

("use strict");
export default class CommonService {
  constructor() {
    this.login = this.login.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.checkUrlToken = this.checkUrlToken.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.dashboardCount = this.dashboardCount.bind(this);
    this.logout = this.logout.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.getLoginUser = this.getLoginUser.bind(this);
    this.updateLoginUser = this.updateLoginUser.bind(this);
  }

  async login(body: any, callback: any) {
    try {
      let filter = {};
      filter["where"] = {
        vEmailId: body.vEmailId,
        tiAccountStatus: 1,
      };
      let user = await models.User.findOne(filter);
      if (user && user !== undefined && user !== null && user !== "") {
        let pass = await bcrypt.compare(body.txPassword, user.txPassword);
        if (pass) {
          let item = {};
          item["iUserId"] = user.iUserId;
          item["vFirstName"] = user.vFirstName;
          item["vLastName"] = user.vLastName;
          item["vEmailId"] = user.vEmailId;
          item["txPassword"] = user.txPassword;
          item["tiAccountStatus"] = user.tiAccountStatus;
          item["tiAccountType"] = user.tiAccountType;
          item["txAccessToken"] = user.txAccessToken;
          item["vImageUrl"] = user.vImageUrl;

          return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "LoginSuccess", code: HttpCodes["OK"], data: item });
        } else {
          return callback(null, { status: HttpCodes["API_FAILURE"], msg: "IncorrectPassword", code: HttpCodes["NOT_FOUND"], data: {} });
        }
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "EnterValidEmail", code: HttpCodes["NOT_FOUND"], data: {} });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async forgotPassword(body: any, callback: any) {
    try {
      var transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.MailUser,
          pass: process.env.MailUserPassword,
        },
      });

      let user = await models.User.findOne({ where: body });

      if (user) {
        let token = await generateToken();
        let URL = `${paths[process.env.NODE_ENV]["BASE_URL"]}${stEmail[process.env.NODE_ENV]["RESET_PASSWORD"]}${token}`;
        await models.User.update({ txEmailToken: token, iUpdatedAt: await getEpoch() }, { where: body });

        const message = `
                    <h1>Inventory Management</h1>
                    <h3>You have requested for password reset</h3>
                    Please go to this link to reset your password
                    <br><br>
                    <a href = ${URL} clicktracking=off>${URL}</a>`;

        const mailOptions = {
          from: process.env.MailUser,
          to: user.vEmailId,
          subject: "Reset Password",
          html: message,
        };

        transport.sendMail(
          mailOptions,
          function (error: any, info: { response: string }) {
            if (error) {
              console.log(error);
              return error;
            } else {
              return "Email sent successfully: " + info.response;
            }
          }
        );
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "ForgotPasswordSuccess", code: HttpCodes["OK"], data: [] });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "ForgotPasswordFail", code: HttpCodes["NOT_FOUND"], data: [] });
      }
    } catch (error) {
      console.log(error);
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"] });
    }
  }

  async checkUrlToken(params, callback) {
    try {
      let filter = {};
      filter["where"] = { txEmailToken: params.txEmailToken };
      let user = await models.User.findOne(filter);
      if (user) {
        let json = { iUserId: user.iUserId, vEmailId: user.vEmailId };
        await models.User.update({ txEmailToken: null }, filter);
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "APISuccess", code: HttpCodes["OK"], data: json });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "TokenExpired", code: HttpCodes["NOT_FOUND"], data: {} });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async resetPassword(body: any, callback: any) {
    try {
      const hash = await bcrypt.hash(body.txPassword, 10);
      let updateUser = await models.User.update({ txPassword: hash, iUpdatedAt: await getEpoch() },
        { where: { iUserId: body.iUserId } }
      );
      if (updateUser) {
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "ResetPasswordSuccess", code: HttpCodes["OK"], data: {} });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["NOT_FOUND"], data: {} });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async changePassword(body: any, callback: any) {
    try {
      // Retrieve the user from the database
      const user = await models.User.findByPk(body.currentUserId);
      if (!user) {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "UserNotFound", code: HttpCodes["NOT_FOUND"], data: {} });
      }

      const passwordMatches = await bcrypt.compare(body.oldPassword, user.txPassword);

      if (!passwordMatches) {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "InvalidOldPassword", code: HttpCodes["BAD_REQUEST"], data: {} });
      }

      if (body.newPassword !== body.confirmPassword) {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "NewPasswordMismatch", code: HttpCodes["BAD_REQUEST"], data: {} });
      }

      if (body.oldPassword === body.newPassword) {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "OldAndNewPasswordSame", code: HttpCodes["BAD_REQUEST"], data: {} });
      }

      const hash = await bcrypt.hash(body.newPassword, 10);
      let result = await models.User.update({ txPassword: hash, iUpdatedAt: await getEpoch() }, { where: { iUserId: body.currentUserId } });


      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "ChangePasswordSuccess", code: HttpCodes["OK"], data: {} });
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async dashboardCount(body: any, callback: any) {
    try {
      
      let json = {}
      const system = await models.System.count({});
      const assignSystem = await models.System.count({where: { vEmployeeId: { [Op.not]: null} }});
      const unassignSystem = await models.System.count({where: { vEmployeeId: null }});
      const totalRequests = await models.Request.count();
      const totalPendingRequests = await models.Request.count({ where: { bIsPending: true } });
      const totalAcceptedRequests = await models.Request.count({ where: { bIsAccept: true } });
      const totalMacMini = await models.Inventory.count({ where: { iAssetType: 17 }});
      const assignMacMini = await models.Inventory.count({ where: { vAssetUser: { [Op.not]: null}, iAssetType: 17 }});
      const unassignMacMini = await models.Inventory.count({ where: { vAssetUser: null, bIsRepair: 0, bIsTrash: 0, iAssetType: 17 }});
      const trashMacMini = await models.Inventory.count({ where: { bIsTrash: 1, iAssetType: 17 }});
      const repairMacMini = await models.Inventory.count({ where: { bIsRepair: 1, iAssetType: 17 }});
      const toalMacBook = await models.Inventory.count({ where: { iAssetType: 18 }});
      const assignMacBook = await models.Inventory.count({ where: { vAssetUser: { [Op.not]: null}, iAssetType: 18 }});
      const unassignMacBook = await models.Inventory.count({ where: { vAssetUser: null, bIsRepair: 0, bIsTrash: 0, iAssetType: 18 }});
      const trashMacBook = await models.Inventory.count({ where: { bIsTrash: 1, iAssetType: 18 }});
      const repairMacBook = await models.Inventory.count({ where: { bIsRepair: 1, iAssetType: 18 }});
      const assignedInventory = await models.Inventory.count({ where: { vAssetUser: {[Op.not]: null }}});
      const unassignedInventory = await models.Inventory.count({ where: { vAssetUser: null }});
      const unassignedLaptop = await models.Inventory.count({ where: { vAssetUser: null, bIsRepair: 0, bIsTrash: 0, iAssetType: 1 }});
      const assignedLaptop = await models.Inventory.count({ where: { vAssetUser: {[Op.not]: null }, iAssetType: 1 }});
      const trashLaptop = await models.Inventory.count({ where: { bIsTrash: 1, iAssetType: 1 }});
      const repairLaptop = await models.Inventory.count({ where: { bIsRepair: 1, iAssetType: 1 }});
      const totalMobile = await models.Inventory.count({ where: { iAssetType: 8 }});
      const unassignedMobile = await models.Inventory.count({ where: { vAssetUser: null, bIsRepair: 0, bIsTrash: 0, iAssetType: 8 }});
      const assignedMobile = await models.Inventory.count({ where: { vAssetUser: {[Op.not]: null }, iAssetType: 8 }});
      const repairMobile = await models.Inventory.count({ where: { bIsRepair: 1, iAssetType: 8 }});
      const trashMobile = await models.Inventory.count({ where: { bIsTrash: 1, iAssetType: 8 }});
      const unassignedMotherboard = await models.Inventory.count({ where: { vAssetUser: null, bIsRepair: 0, bIsTrash: 0, iAssetType: 4 }});

      const inventory = await models.Inventory.findAll({
        attributes: ['iAssetType', [sequelize.fn('COUNT', sequelize.literal('1')), 'count'], 'vAssetName'],
        group: ['iAssetType'],
      });
      
      for ( let item of inventory) {
        let name = item.dataValues.vAssetName 
        json[name]  = item.dataValues.count;
      }

      json['system'] = system;
      json['assignSystem'] = assignSystem;
      json['unassignSystem'] = unassignSystem;
      json['totalRequests'] = totalRequests;
      json['totalPendingRequests'] = totalPendingRequests;
      json['totalAcceptedRequests'] = totalAcceptedRequests;
      json['assignedInventory'] = assignedInventory;
      json['unassignedInventory'] = unassignedInventory;
      json['unassignedLaptop'] = unassignedLaptop;
      json['assignedLaptop'] = assignedLaptop;
      json['trashLaptop'] = trashLaptop;
      json['repairLaptop'] = repairLaptop;
      json['totalMobile'] = totalMobile;
      json['unassignedMobile'] = unassignedMobile;
      json['assignedMobile'] = assignedMobile;
      json['repairMobile'] = repairMobile;
      json['trashMobile'] = trashMobile;
      json['unassignedMotherboard'] = unassignedMotherboard;
      json['totalMacMini'] = totalMacMini;
      json['assignMacMini'] = assignMacMini;
      json['unassignMacMini'] = unassignMacMini;
      json['trashMacMini'] = trashMacMini;
      json['repairMacMini'] = repairMacMini;
      json['toalMacBook'] = toalMacBook;
      json['assignMacBook'] = assignMacBook;
      json['unassignMacBook'] = unassignMacBook;
      json['trashMacBook'] = trashMacBook;
      json['repairMacBook'] = repairMacBook;
      return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "APISuccess", code: HttpCodes["OK"], data: json });
    }
    catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async logout(body: any, callback: any) {
    try {
      let updateToken = await models.User.update({ txAccessToken: null, iUpdatedAt: await getEpoch() }, { where: { iUserId: body.currentUserId } });
      if (updateToken) {
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "LogoutSuccess", code: HttpCodes["OK"] });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"] });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }

  async getLoginUser(body, callback) {
    try {

      const user = await models.User.findOne({ where: { iUserId: body.currentUserId } });

      if (user) {
        const loginUser = {
          iUserId: user.iUserId,
          vFirstName: user.vFirstName,
          vLastName: user.vLastName,
          vEmailId: user.vEmailId,
          vImageUrl: user.vImageUrl,
          vPhoneNo: user.vPhoneNo
        };

        return callback(null, { status: HttpCodes.API_SUCCESS, msg: 'GetLoginUserSuccess', code: HttpCodes.OK, data: loginUser });
      } else {
        return callback(null, { status: HttpCodes.API_FAILURE, msg: 'UserNotFound', code: HttpCodes.CONTENT_NOT_FOUND, data: {} });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes.API_FAILURE, msg: 'SomeThingWentWrong', code: HttpCodes.BAD_REQUEST, data: {} });
    }
  }

  async updateLoginUser(body, files, callback) {
    try {
      const user = await models.User.findOne({ where: { iUserId: body.currentUserId } });
  
      let profileUploadPath = `${paths[process.env.NODE_ENV]['USER_PROFILE_BUCKET']}`;
      let imageUrl = user.vImageUrl;
  
      // Check if files are provided for image upload
      if (files && files.length > 0) {
        const extName = extname(files[0].originalname).toLowerCase().substring(1);
        const fileName = `${body.currentUserId}.${extName}`;
  
        const uploadParams = {
          Bucket: process.env.BUCKETNAME,
          acl: 'public-read',
          Key: `${profileUploadPath}${fileName}`,
          Body: files[0].buffer,
          ContentType: `image/${extName}`,
        };
  
        // Upload the new image to storage
        await uploadS3Image(uploadParams);
  
        // Delete existing image if it exists
        if (user && user.vImageUrl) {
          const existingImageUrl = user.vImageUrl;
          const existingImageKey = existingImageUrl.substring(existingImageUrl.lastIndexOf('/') + 1);

          const AWS = require('aws-sdk');
          const s3 = new AWS.S3();
  
          const deleteParams = {
            Bucket: process.env.BUCKETNAME,
            Key: `${profileUploadPath}${existingImageKey}`,
          };
  
          await s3.deleteObject(deleteParams).promise();
        }
  
        imageUrl = `${process.env.BASEURL}${profileUploadPath}${fileName}`;
      }
  
      const updateData: any = { iUpdatedAt: await getEpoch() };
      Object.assign(updateData, body);
      updateData.vImageUrl = imageUrl;
  
      await models.User.update(updateData, {
        where: { iUserId: body.currentUserId },
      });
  
      return callback(null, { status: HttpCodes.API_SUCCESS, msg: "UpdateLoginUserSuccess", code: HttpCodes.OK, data: updateData });
    } catch (error) {
      return callback(null, { status: HttpCodes.API_FAILURE, msg: "SomeThingWentWrong", code: HttpCodes.BAD_REQUEST, data: {} });
    }
  }
  

}