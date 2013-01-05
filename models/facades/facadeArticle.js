var sync = require("../../core/libraries/sync");
var article = require("../dao/article");
var mbSegmentetor = require('../../core/libraries/mbSegmentetor');

var facadeArticle = {
	getList : function(callBack, options){

		var args = {fields : {}, conditions : {}, other : {limit : 10, sort : {modified: -1}}};

		if(options.category){
			args.conditions.categoryId = options.category;
		}

		var getArticle = function(next){
			article.find(args.conditions,args.fields,args.other,
					function(err, articles){
						if(err){
							throw new Error(err.toString());
						}
						sync.merge({articles : articles});
						next();
					});
		}
		var done = function(vars){
			//console.log(vars);
			callBack(vars);
		}
		sync.pipe([getArticle], done);
	},
	getCategory : function(){
		
	}
}

module.exports = facadeArticle;