/**
* Module dependencies.
*/
var Class = require("../../core/libraries/class");

/**
* constructor
*/
function article(){
	this.connectionName = "mongo_master";
	this.schema = {
		id : Number,
		english : String,
		japanese : String,
		japaneseFullTextSearch : Array,
		categoryId : Number,
		soundFilePath : String,
		created : {type: Date, default: Date.now},
		modified : {type: Date, default: Date.now}
	}
}
var model = Class.modelInit(article);



//モジュール登録
module.exports = model;