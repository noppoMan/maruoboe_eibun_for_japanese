/**
* Module dependencies.
*/
var _mongo = require('mongoose');

/**
* constructor
*/
function mongoDriver(){
	this._con = null
	this._col = null;
	this._schema = null;
	this._collName = null;
}

/**
* methods, properties
*/
mongoDriver.prototype = {
	/**
	* void init
	*/
	init : function(){

	},

	/**
	*void createConnection
	*/
	createConnection : function(host, dbName, port){
		try{
			this._con = _mongo.connect('mongodb://' + host + '/' + dbName);
		}catch(e){
			throw new Error("database connection error occured.");
		}
	},

	/*
	* object getCollection
	*/
	getCollection : function(colName, schema){
		var Schema = this._con.Schema;
		this._col = this._con.model(colName, new Schema(schema));
		return this._col;
	},

	/**
	* object getDBConnection
	*/
	getConnection : function(){
		return this._con;
	}
};


module.exports = mongoDriver;
