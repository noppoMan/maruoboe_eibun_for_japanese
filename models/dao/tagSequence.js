/**
* Module dependencies.
*/
var Class = require("../../core/libraries/class");

/**
* constructor
*/
function tagSequence(){
	this.connectionName = "mongo_master";
	this.schema = {
		sequence : Number
	}
}
var model = Class.modelInit(tagSequence);

//method
model.addMethod("increment", function(callBack){
	this.getCollection().find({}, {}, {limit : 1},
		function(err, result){
			if(err){
				throw new Error(err.toString());
			}
			var id = result[0].sequence;
			id++;
			model.getCollection().update({ sequence: id }, function(err) {
				if(err){
					throw new Error("tagSequence increment error occured");
				}
				callBack(id);
			});
		});
});

//モジュール登録
module.exports = model;