
/**
* module dependencies
*/
var Class = require("../../core/libraries/class");
var dbConf = require("../../core/configures/database");
var uf = require("../../core/libraries/utils");

/**
* constructor
*/
function model(){
	this.connectionName = null;
	this.db = null;
	this._colName = null;
}

model.prototype = {
	cacheCollections : {},
	createConnection : function(connectionName){

		if(uf.isset(this.connectionName)){
			connectionName = this.connectionName;
		}

		if(uf.empty(connectionName)){
			throw new Error("argument error uccured: connectionName is not empty");
		}

		//get db connection info from config
		try{
			var dbCnf = dbConf.get(connectionName);
			var driverPath = "../../core/db/" + dbCnf.adapter + "Driver";
			//var driver = require(driverPath);
			this.db = require(driverPath);//new driver();
		}catch(e){
			throw new Error("Driver not found Exception  : " + driverPath);
		}

		//try to connect db
		this.db.createConnection(dbCnf.host, dbCnf.dbName, dbCnf.port);
	},
	getCollection : function(colName, schema){
		if(!uf.isset(colName)){
			colName = this.constructor.name;
		}

		if(!uf.isset(schema)){
			schema = this.schema;
		}
		if(typeof(this.cacheCollections[colName]) != "undefined"){
			return this.cacheCollections[colName];
		}
		this.cacheCollections[colName] = this.db.getCollection(colName, schema);
		return this.cacheCollections[colName];
	},
	getDriveInstance : function(){
		return this.db;
	},
	addMethod : function(methodName, logic){
		this[methodName] = logic;
	}
}

module.exports = model;//Class.extend(model, require("../../core/db/mongoDriver"));

