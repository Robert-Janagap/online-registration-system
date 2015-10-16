
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	curriculumList  =new mongoose.Schema( {
    curriculumYear: Number
},{ collection : 'curriculumList' } );

module.exports = curriculumList;