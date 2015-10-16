
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var	schoolAssestments  =new mongoose.Schema( {
    typeOfFee: String,
    fees:[
    	{
    		fee_name: String,
		    amount: Number,
		    date_created: String
    	}
    ],
    keywords:[String] 
},{ collection : 'assestments' } );

module.exports = schoolAssestments;