"use strict";

var express = require('express');
var router = express.Router();

require('./system')(router);

module.exports = router