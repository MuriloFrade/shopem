var assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    config = require('../config'),
    app = require('../app');


process.env.NODE_ENV = 'test';
process.env.PORT = 3002;
