/**
* Module dependencies.
*/
var Class = require("../../core/utils/class");

/**
* constructor
*/
function article(){
	this.connectionName = "mongo_master";
	this.schema = {
		english : String,
		japanese : String,
		created : {type: Date, default: Date.now},
		modified : {type: Date, default: Date.now}
	}
}

//コネクションを取得する
var collection = Class.modelInit(article, require("../../core/db/model"));

collection.test = function(){

}

console.log(collection);

//モジュール登録
module.exports = collection;