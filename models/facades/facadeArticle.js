var facadeArticle = {
	getDocument : function(callBack, options){
		if(typeof(arguments[1]) != "undefined"){
			if(typeof(options) == "object" && options.length > 0){

			}else{

			}
		}else{
			options = {fields : {}, conditions : {}, other : {limit : 10, sort : {modified: -1}}};
		}		

		return (function(){
			var article = require("../dao/article");
			//if(options.length == 0){
				article.find(options.conditions, options.fields, options.other,
				function(err, result){
					if(err){
						throw new Error(err.toString());
					}
					var vars = {result : result}
					callBack(vars);
				});
			//}
		})();
	}
}

module.exports = facadeArticle;