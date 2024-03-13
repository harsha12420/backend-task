"use strict";

var express = require('express');
var router = express.Router();

require('./request')(router);

module.exports = router