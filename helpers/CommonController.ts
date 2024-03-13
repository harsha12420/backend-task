const models = require("./../models/index");
import AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});
let s3 = new AWS.S3();
import { HttpCodes } from "./responseCodes";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import moment from "moment";
export default class CommonController {
  constructor() {
    this.getEpoch = this.getEpoch.bind(this);
    this.covertDatetoEpoch = this.covertDatetoEpoch.bind(this);
    this.APIResponse = this.APIResponse.bind(this);
    this.generateToken = this.generateToken.bind(this);
    this.createAccessToken = this.createAccessToken.bind(this);
    this.checkAccessToken = this.checkAccessToken.bind(this);
    this.SendEmail = this.SendEmail.bind(this);
    this.uploadS3Image = this.uploadS3Image.bind(this);
  }

  async getEpoch() {
    return Math.floor(Date.now() / 1000);
  }

  async covertDatetoEpoch(date) {
    return Math.floor(moment(date).valueOf() / 1000);
  }

  async APIResponse(res, error, result) {
    if (error) {
      res.status(200).json({
        message: res.__("api.errors.SomethingWrong"),
        code: HttpCodes["BAD_REQUEST"],
      });
    } else {
      if (result && result.status === "customError") {
        res.status(200).json({
          message: res.__(`api.errors.${result.msg}`),
          code: result.code,
          data: result.data,
        });
      } else {
        res.status(200).json({
          message: res.__(`api.msg.${result.msg}`),
          code: result.code,
          data: result.data,
        });
      }
    }
  }

  async generateToken() {
    return uuid();
  }

  // API Authorization
  async createAccessToken(req, res, next) {
    try {
      let user = await models.User.findOne({
        where: {
          tiAccountStatus: 1,
          vEmailId: req.body.vEmailId,
        },
      });
      if (user && user !== undefined && user !== null && user !== "") {
        // const expiresIn = '30s';
        var token = jwt.sign(
          {
            id: user.iUserId,
            userType: user.tiAccountType,
            superUserId: user.iSuperUserId,
          },
          process.env.JWTSECRETKEY
          // { expiresIn }
        );
        let filter = {};
        filter["where"] = { iUserId: user.iUserId };
        await models.User.update(
          { txAccessToken: token, iUpdatedAt: await this.getEpoch() },
          filter
        );
        return next();
      } else {
        return res.status(200).json({
          message: res.__("api.msg.EnterValidEmail"),
          code: HttpCodes["NOT_FOUND"],
        });
      }
    } catch (error) {
      console.log(error, ">>>>>>>>>>>>>createAccessToken>>>>>>>>>>>>>>>>");
    }
  }

  async checkAccessToken(req, res, next) {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.JWTSECRETKEY, async (err, decoded) => {
      let filter = {};
      filter["where"] = {
        iUserId: decoded.id,
      };
      let user = await models.User.findOne(filter);

      if (err || user.txAccessToken === null) {
        return res.status(401).send({ message: "Unauthorized Request!" });
      }
      req.body.currentUserId = decoded.id;
      req.body.vEmployeeId = user.vEmployeeId;
      req.user = user;

      next();
    });
  }

  async SendEmail(data) {}

  async uploadS3Image(dataParams) {
    try {
      const { Location, Key } = await s3.upload(dataParams).promise();
      console.log(Location, "<", Key);
      return true;
    } catch (error) {
      console.log("err=====>", error);
      return false;
    }
  }

  async deleteObjectS3(data) {
    s3.deleteObject(data, function (err, s3data) {
      console.log("s3 result============", err, s3data);
    });
  }

  async checkAccountType(req, res, next) {
    if (req.user.tiAccountType !== 1) {
      return res.status(400).json({
        message: res.__("api.msg.PermissionDenied"),
        code: HttpCodes["BAD_REQUEST"],
      });
    }
    next();
  }
}
