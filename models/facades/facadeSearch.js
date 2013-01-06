var facadeSearch = {
	getCategory : function(callBack, options){
		var category = require("../dao/category");
		var _sync = require("../../core/libraries/sync");

		var sync = new _sync();

		var getCategory = function(next){
			category.getCollection().find({}, {}, {sort: { categoryId: 'Ascending' }},
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