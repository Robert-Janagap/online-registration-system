var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var studentSchoolInfo  =new mongoose.Schema( {
    student_no: Number,
    enrolled: Boolean,
    curriculum: Number,
    course_name: String,
    course_des: String,
    year_level: Number,
    term: Number,
    status: String,
    section: String,
    school_year: String,
    schedule:[
        {
            section_name: String,
            subject_name: String,
            subject_des: String,
            units: Number,
            days: String,
            time: String,
            room: String,
            instructor: String,
            year_level: Number,
            term: Number
        }
    ]
},{ collection : 'studentSchoolInfo' } );

module.exports = studentSchoolInfo;