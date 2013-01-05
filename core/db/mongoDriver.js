/**
* mongoose wrapper module
*/

/**
* Module dependencies.
*/
var _mongo = require('mongoose');

/**
* constructor
*/
/*function mongoDriver(){
	this._con = null;
	this._col = null;
	this._collName = null;
}*/

/**
* Singleton Driver
*/
mongoDriver = {
	pool : {},
	currentConnectKey : null,
	//this._collName = null;
	/**
	* void init
	*/
	init : function(){

	},

	/**
	*void createConnection
	*/
	createConnection : function(host, dbName, port){
		this.currentConnectKey = host+dbName;
		if(typeof(this.pool[host+dbName]) != "undefined"){
			return;
		}
		this.pool[host+dbName] = {};
		try{
			this.pool[this.currentConnectKey]._con = _mongo.connect('mongodb://' + host + '/' + dbName);
		}catch(e){
			throw new Error("database connection error occured.");
		}
	},

	/*
	* object getCollection
	*/
	getCollection : function(colName, schema){
		var Schema = this.pool[this.currentConnectKey]._con.Schema;
		return this.pool[this.currentConnectKey]._con.model(colName, new Schema(schema));
	},

	/**
	* object getDBConnection
	*/
	getConnection : function(){
		return this.pool[this.currentConnectKey]._con;
	}
};


module.exports = mongoDriver;