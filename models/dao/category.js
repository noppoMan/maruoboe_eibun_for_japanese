/**
* Module dependencies.
*/
var Class = require("../../core/libraries/class");

/**
* constructor
*/
function category(){
	this.connectionName = "mongo_master";
	this.schema = {
		categoryId : Number,
		name : String
		//created : {type: Date, default: Date.now},
		//modified : {type: Date, default: Date.now}
	}
}
var model = Class.modelInit(category);


//モジュール登録
module.exports = model;