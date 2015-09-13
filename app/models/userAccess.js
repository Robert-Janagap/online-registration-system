var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	userAccess  =new mongoose.Schema( {
    username: String,
    password: String,
    name: String,
    roles:String
},{ collection : 'userAccess' } );

module.exports = userAccess;