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
		english : String,
		japanese : String,
		soundFilePath : String,
		created : {type: Date, default: Date.now},
		modified : {type: Date, default: Date.now}
	}
}
var model = Class.modelInit(article);

//method
model.addMethod("test", function(){
	//thisの参照は、modelクラスobjectである
	console.log(this);
	console.log("tinpo");
});



//モジュール登録
module.exports = model;