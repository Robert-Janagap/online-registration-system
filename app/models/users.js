var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	userAccess  =new mongoose.Schema( {
    username: String,
    password: String,
    name: String,
    roles:String,
    schedules:[
    	{
    		subject_name:String,
			subject_des:String,
			section:String,
			units:Number,
			time:String,
			days:String,
			room: String
    	}
    ],
    studentList: [
        {
            subject_name: String,
            section:String,
            course_name: String,
            student_no: Number,
            year_level: Number,
            term: Number,
            units: Number,
            student_name: String,
            Prelim: Number,
            Midterm: Number,
            PreFinal: Number,
            Final: Number
        }
    ]
},{ collection : 'users' } );

module.exports = userAccess;