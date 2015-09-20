var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	classSchedules  =new mongoose.Schema( {
   course_name: String,
   year_level: Number,
   term: Number,
   section: String,
   schedule:[
      {
         subject_name: String,
         subject_des: String,
         units: Number,
         time: String,
         days: String,
         room: String,
         instructor: String,
         section: String
      }
   ]
},{ collection : 'classSchedules' } );

module.exports = classSchedules;