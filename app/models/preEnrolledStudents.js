var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	preEnrolledStudents  =new mongoose.Schema( {
   first_name: String,
   middle_name: String,
   last_name: String,
   gender: String,
   address: String,
   email: String,
   birthday: String,
   age: Number,
   contact: Number,
   nationality: String,
   civil_status: String,
   mother_name: String,
   mother_occupation: String,
   father_name: String,
   father_occupation: String,
   high_Educ_Att: String,
   prev_school: String,
   prev_school_add: String,
   guardian_name: String,
   guardian_add: String,
   guardian_contact: Number,
   guardian_rel: String
},{ collection : 'preEnrolledStudents' } );

module.exports = preEnrolledStudents;