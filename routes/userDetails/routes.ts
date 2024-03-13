"use strict";

var express = require('express');
var router = express.Router();

require('./userDetails')(router);

module.exports = router