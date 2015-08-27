var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	courseSelectection =new mongoose.Schema( {
    school_year : Number,
    departments  : [
        {
            department_name : String,
            department_des : String,
            course_name: String,
            course_des: String,
            term: Number,
            year_level: Number
        }
    ]
},{ collection : 'courseSelection' } );

module.exports = courseSelectection;