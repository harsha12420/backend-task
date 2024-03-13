"use strict";

var express = require('express');
var router = express.Router();

require('./iotInventory')(router);

module.exports = router