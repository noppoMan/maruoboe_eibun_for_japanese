var facadeSearch = {
	getCategory : function(callBack, options){
		var category = require("../dao/category");
		var sync = require("../../core/libraries/sync");

		var getCategory = function(next){
			category.find(
					function(err, categories){
						if(err){
							throw new Error(err.toString());
						}
						sync.merge({categories : categories});
						next();
					});
		}
		
		var done = function(vars){
			//console.log(vars);
			callBack(vars);
		}

		sync.pipe([getCategory], done);
	}
}

module.exports = facadeSearch;