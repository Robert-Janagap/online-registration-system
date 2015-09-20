var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	preEnrolledStudents  =new mongoose.Schema( {
   prefferedCourse: String, //application data
   first_name: String,//personal info
   middle_name: String,
   last_name: String,
   gender: String,
   address: String,
   email: String,
   birthday: String,
   age: Number,
   contact: Number,
   nationality: String,
   religion: String,
   civil_status: String,
   mother_name: String,//parents info
   mother_occupation: String,
   father_name: String,
   father_occupation: String,
   high_Educ_Att: String,
   prev_school: String,
   prev_school_add: String,
   guardian_name: String,//guadian info
   guardian_add: String,
   guardian_contact: Number,
   guardian_rel: String,
   student_no: Number,
   school_year: Number
},{ collection : 'preEnrolledStudents' } );

module.exports = preEnrolledStudents;