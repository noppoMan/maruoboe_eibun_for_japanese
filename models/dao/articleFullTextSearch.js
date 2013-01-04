/**
* Module dependencies.
*/
var Class = require("../../core/libraries/class");

/**
* constructor
*/
function articleFullTextSearch(){
	this.connectionName = "mongo_master";
	this.schema = {
		japanese : String,
		soundFilePath : Array,
		created : {type: Date, default: Date.now},
		modified : {type: Date, default: Date.now}
	}
}
var model = Class.modelInit(articleFullTextSearch);

//method
model.addMethod("test", function(){
	//thisの参照は、modelクラスobjectである
	console.log(this);
	console.log("tinpo");
});



//モジュール登録
module.exports = model;