"use strict";

const models = require("./../models/index");
import moment from "moment-timezone";
import { HttpCodes } from "../helpers/responseCodes";
import { extname } from "path";
import { paths } from "../helpers/staticCode";
import commonHelper from "../helpers/CommonController";
const {
    getEpoch,
    uploadS3Image
} = new commonHelper();

export default class RequestService {
  constructor() {
    this.addRequest = this.addRequest.bind(this);
    this.getById = this.getById.bind(this);
    this.getAllRequest = this.getAllRequest.bind(this);
    this.acceptRejectRequest = this.acceptRejectRequest.bind(this);
    this.closeRequest = this.closeRequest.bind(this);
  }

  async addRequest(body: any, callback: any) {
    try {
      let addRequest = models.Request.build({
        vEmployeeId: body.vEmployeeId,
        iDeviceType: Number(body.iDeviceType),
        vDeviceInfo: body.vDeviceInfo,
        iCreatedAt: await getEpoch(),
        iUpdatedAt: await getEpoch()
      });
      let request = await addRequest.save();
      if (request){
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AddRequestSuccess", code: HttpCodes["OK"], data: request });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });  
      }
    } catch (error) {
      console.log(error,"eroor==")
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }
  
  async getById(body, params, callback) {
    try {
      const request = await models.Request.findOne({
        where: { iRequestId: params.iRequestId },
        include: [
          {
            model: models.Asset
          },
          {
            model: models.Bill
          },
          {
            model: models.UserDetails
          }
        ],
      });

      if (request) {
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetRequestData", code: HttpCodes["OK"], data: request });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "RequestNotFound", code: HttpCodes["NOT_FOUND"], data: {} });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }
  
  async getAllRequest(body, query, callback) {
    try {
      const offset = (query.page - 1) * query.limit;
      
      let filter = {}
      let filterCount = {}

      if (query.flag === '1' || query.flag === 1) {
        filter['where'] = { vEmployeeId: body.vEmployeeId }
        filterCount['where'] = { vEmployeeId: body.vEmployeeId }
      }

      filter['include'] = [
        {
          model: models.Asset
        },
        {
          model: models.Bill
        },
        {
          model: models.UserDetails,
        }
      ]
      filter['offset'] = Number(offset), 
      filter['limit'] = Number(query.limit) 

      filterCount['include'] = [
        {
          model: models.UserDetails,
        }
      ]
  
      const totalCount = await models.Request.count(filterCount);
      const request = await models.Request.findAll(filter);
  
      if (request.length === 0) {
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetMyRequestData", code: HttpCodes["OK"], data: {} }) 
      } else {
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "GetMyRequestData", code: HttpCodes["OK"], data: { totalCount, request } });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }
  

  async acceptRejectRequest(params: any, body: any, callback: any) {
    try {
      const { bIsAccept, txRejectReason } = body;
      
      if (bIsAccept === true) {
        // Update the request record to accept
        await models.Request.update(
          { bIsPending: false, bIsAccept: true, bIsReject: false },
          { where: { iRequestId: params.iRequestId } }
        );
  
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "AcceptRequest", code: HttpCodes["OK"] });
      } else if (bIsAccept === false && txRejectReason) {
        // Update the request record to reject with reason
        await models.Request.update(
          { bIsPending: false, bIsAccept: false, bIsReject: true, txRejectReason: txRejectReason },
          { where: { iRequestId: params.iRequestId } }
        );
  
        return callback(null, { status: HttpCodes["API_SUCCESS"], msg: "RejectRequest", code: HttpCodes["OK"] });
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "RejectReasonRequired", code: HttpCodes["BAD_REQUEST"], data: {} });
      }
    } catch (error) {
      return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
    }
  }
  

  async closeRequest(body, files, callback) {
    try {
      let billUploadPath = `${paths[process.env.NODE_ENV]['BILL_BUCKET']}`;
      if (files.length > 0) {
        let extName = extname(files[0]['originalname']).toLowerCase().substring(1);
        let fileName = `${body.vBillNo}.${extName}`;
        let fileParams = {
          Bucket: process.env.BUCKETNAME,
          acl: 'public-read',
          Key: `${billUploadPath}${fileName}`,
          Body: files[0]['buffer'],
          ContentType: "image/" + extName
        };
        await uploadS3Image(fileParams);

        const baseUrl = process.env.BASEURL;
			  const fullUrl = `${baseUrl}${billUploadPath}${fileName}`;

        let addBill = models.Bill.build({
          vBillNo: body.vBillNo,
          vVendorDetails: body.vVendorDetails,
          iAddedBy: body.currentUserId,
          vBillImage: fullUrl,
          iCreatedAt: await getEpoch(), 
          iUpdatedAt: await getEpoch(),
        });
        let bill = await addBill.save();
        let updatedRequest = await models.Request.update({ vBillNo: body.vBillNo, bIsClosed: true, iUpdatedAt: await getEpoch() } , { where: { iRequestId: body.iRequestId }});
        if (updatedRequest[0] == 1) {
          return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'BillUploadedSuccess', code: HttpCodes['OK'] });
        } else {
          return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
        }
      }
    } catch (error) {
      if ( error.name === 'SequelizeUniqueConstraintError' ) {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "UniqueBillNo", code: HttpCodes["CONFLICT"], data: {} });        
      } else {
        return callback(null, { status: HttpCodes["API_FAILURE"], msg: "SomeThingWentWrong", code: HttpCodes["BAD_REQUEST"], data: {} });
      }
    }
  }

}