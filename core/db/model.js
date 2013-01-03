
/**
* module dependencies
*/
var Class = require("../../core/utils/class");
var dbConf = require("../../config/database");
var uf = require("../../core/utils/utilFunctions");

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
		//設定からDB接続情報を取得
		var dbCnf = dbConf.getDBConnectInfo(connectionName);
		var driverPath = "../../core/db/" + dbCnf.adapter + "Driver";
		try{
			var driver = require(driverPath);
			this.db = new driver();
		}catch(e){
			throw new Error("Driver not found Exception  : " + driverPath);
		}

		if(!uf.isset(connectionName) || uf.empty(connectionName)){
			throw new Error("argument error uccured: connectionName is not empty");
		}
		//try to connecto db
		this.db.createConnection(dbCnf.host, dbCnf.dbName);
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
		スキーマ設定をキャッシュする
		this.cacheCollections[colName] = this.db.getCollection(colName, schema);
		*/
		return this.db.getCollection(colName, schema);//this.cacheCollections[colName];
	}
}

module.exports = model;//Class.extend(model, require("../../core/db/mongoDriver"));

