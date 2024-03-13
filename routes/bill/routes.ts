"use strict";

var express = require('express');
var router = express.Router();

require('./bill')(router);

module.exports = router