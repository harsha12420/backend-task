"use strict";

import BillService from "../services/BillService";
import commonHelper from "../helpers/CommonController";
const { APIResponse } = new commonHelper();

export default class BillController {
  bill: BillService;
  constructor() {
    this.bill = new BillService();
    this.addBill = this.addBill.bind(this);
    this.getAllBill = this.getAllBill.bind(this);
    this.getBillById = this.getBillById.bind(this);
    this.updateBill = this.updateBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
  }

  addBill(req: any, res: any) {
    this.bill.addBill(req.body, req.files, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  getAllBill(req: any, res: any) {
    const { page, limit } = req.query;
    this.bill.getAllBill(page, limit, async (error: any, result: any) => {
      await APIResponse(res, error, result);
    });
  }

  getBillById(req: any, res: any) {
    this.bill.getBillById(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }

  updateBill(req: any, res: any) {
    this.bill.updateBill(
      req.params,
      req.body,
      req.files,
      async (error: any, result: any) => {
        await APIResponse(res, error, result);
      }
    );
  }

  deleteBill(req: any, res: any) {
    this.bill.deleteBill(req.params, async (error, result) => {
      await APIResponse(res, error, result);
    });
  }
}
