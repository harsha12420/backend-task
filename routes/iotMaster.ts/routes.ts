"use strict";

var express = require('express');
var router = express.Router();

require('./iotMaster')(router);

module.exports = router