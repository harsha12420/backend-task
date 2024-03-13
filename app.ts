"use strict";

import express from "express";
import fs from "fs";
import morgan from "morgan";
import { join, resolve } from "path";
import i18n from "i18n";
import cors  from 'cors';
const swaggerUi = require('swagger-ui-express');
import { Cron } from "./cron";

const app = express();

const cron = new Cron()

// cron initialization
cron.initCron()

if (fs.existsSync("./.env")) {
  require("dotenv").config();
}

import * as swaggerDefinition from './swagger/config';

// Localization setup
i18n.configure({
  locales: ["en"],
  directory: resolve(__dirname, "../locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  objectNotation: true
});
app.use(i18n.init);

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Headers', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Headers,Authorization,token,x-device-type,x-app-version,x-build-number,uuid,x-auth-token,X-L10N-Locale'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  } else {
    next();
  }
});

// View engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "staging" || process.env.NODE_ENV ==="production") {
  app.use(morgan("dev"));
}

app.use(express.json({type:'application/json', limit: '100mb'}));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use('/api/images/', express.static('public'))


app.get('/', function (req, res) {
  res.send("Welcome to Inventry management");
});

// initialize swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDefinition);
});

// Load routes
var adminRoutes = require("./routes/admin/routes");
var commonRoutes = require("./routes/common/routes");
var inventoryRoutes = require("./routes/inventory/routes");
var assetRoutes = require("./routes/asset/routes");
var userDetailsRoutes = require("./routes/userDetails/routes");
var requestRoutes = require("./routes/request/routes");
var systemRoutes = require("./routes/system/routes");
var billRoutes = require("./routes/bill/routes");
var IotMasterRoutes = require("./routes/iotMaster.ts/routes");
var IotInvetoryRoutes = require("./routes/iotInventory/routes");

app.use("/api/admin", adminRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use('/api/asset', assetRoutes);
app.use('/api/userDetails', userDetailsRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/system', systemRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/iotMaster", IotMasterRoutes);
app.use("/api/iotInventory", IotInvetoryRoutes);

module.exports = app;
