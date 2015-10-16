
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	schoolCurriculum  =new mongoose.Schema( {
    school_year : Number,
    department_name : String,
    department_des : String,
    courses: [
     {
         course_name: String,
         course_des: String,
         totalYears: Number,
         totalTerms: Number,
     }
    ],
    subjects: [
     {
         course_name: String,
         course_des: String,
         year_level: Number,
         term: Number,
         subject_name: String,
         subject_des: String,
         units: Number,
         cost_perUnits: Number,
         pre_requisite: String
     }
    ],
    keywords:[String] 
},{ collection : 'curriculums' } );

module.exports = schoolCurriculum;