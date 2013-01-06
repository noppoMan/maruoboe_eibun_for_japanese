/**
* Module dependencies.
*/
var Class = require("../../core/libraries/class");

/**
* constructor
*/
function articleSequence(){
	this.connectionName = "mongo_master";
	this.schema = {
		sequence : Number
	}
}
var model = Class.modelInit(articleSequence);

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
					throw new Error("articleSequence increment error occured");
				}
				callBack(id);
			});
		});

	/*
	var o = model.getCollection();
    var con = new o();
    con.sequence = 1;
    con.save(function(err) {
        if(err) throw err;
        //res.render('index', {title:'Address Book'});
    });
*/


});


console.log(model);


//モジュール登録
module.exports = model;