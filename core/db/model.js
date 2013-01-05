
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
	this.cacheCollections = {};
	this._colName = null;
}

model.prototype = {
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

		/*
		if(uf.inArray(this.cacheCollections, colName)){
			return this.cacheCollections[colName];
		}
		スキーマobjectをキャッシュする
		this.cacheCollections[colName] = this.db.getCollection(colName, schema);
		*/

		var col = this.db.getCollection(colName, schema);

		//動的メソッド追加関数
		col.addMethod = function(methodName, logic){
			eval("col." + methodName + "=" + logic);
		}
		return col;
	}
}

module.exports = model;//Class.extend(model, require("../../core/db/mongoDriver"));

