/**
* Module dependencies.
*/
var Class = require("../../core/libraries/class");

/**
* constructor
*/
function tag(){
	this.connectionName = "mongo_master";
	this.schema = {
		id : Number,
		name : String,
		chars : Array,
		created : {type: Date, default: Date.now},
		modified : {type: Date, default: Date.now}
	}
}
var model = Class.modelInit(tag);



//モジュール登録
module.exports = model;