"use strict";

var express = require('express');
var router = express.Router();

require('./inventory')(router);

module.exports = router