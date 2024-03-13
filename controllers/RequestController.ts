  "use strict";

  import RequestService from "../services/RequestService";
  import commonHelper from "../helpers/CommonController";
  const { APIResponse } = new commonHelper();

  export default class RequestController {
    request: RequestService;
    constructor() {
      this.request = new RequestService();
      this.addRequest = this.addRequest.bind(this);
      this.getById = this.getById.bind(this);
      this.getAllRequest = this.getAllRequest.bind(this);
      this.acceptRejectRequest = this.acceptRejectRequest.bind(this);
      this.closeRequest = this.closeRequest.bind(this);
    }

    addRequest(req: any, res: any) {
      this.request.addRequest(req.body, async (error, result) => {
        await APIResponse(res, error, result);
      })
    }

    getById(req: any, res: any) {
      this.request.getById(req.body, req.params,  async (error: any, result: any) => {
        await APIResponse(res, error, result);
      });
    }

    getAllRequest(req: any, res: any) {
      this.request.getAllRequest(req.body, req.query,  async (error: any, result: any) => {
        await APIResponse(res, error, result);
      });
    }
    
    acceptRejectRequest(req: any, res: any) {
      this.request.acceptRejectRequest(req.params, req.body, async (error: any, result: any) => {
        await APIResponse(res, error, result);
      });
    }
    
    closeRequest(req: any, res: any) {
      this.request.closeRequest(req.body, req.files, async (error: any, result: any) => {
        await APIResponse(res, error, result);
      });
    }
    
  }