var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	schoolCurriculum  =new mongoose.Schema( {
    school_year : Number,
    departments  : [
        {
            department_name : String,
            department_des : String,
            course_name: String,
            course_des: String,
            subjects: [
                {
                    subject_name: String,
                    subject_des: String,
                    units: Number,
                    cost_perUnits: Number,
                    pre_requisite: String
                }
            ],
            term: Number,
            year_level: Number
        }
    ],
    keywords:[String] 
},{ collection : 'curriculums' } );

module.exports = schoolCurriculum;