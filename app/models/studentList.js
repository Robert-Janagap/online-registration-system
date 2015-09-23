var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var studentList  =new mongoose.Schema( {
    student_no: Number,
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
    subjects:[
        {
            subject_name: String,
            subject_des: String,
            year_level: Number,
            term: Number,
            units: Number,
            cost_perUnits: Number,
            pre_requisite: String,
            prelim: Number,
            midterm: Number,
            pre_final: Number,
            finals: Number
        }
    ]
},{ collection : 'studentList' } );

module.exports = studentList;