exports.scene = function(req, res){
	var facadeSearch = require('../models/facades/facadeSearch');
	facadeSearch.getCategory(function(vars){
		res.render('search/scene', {categories : vars.categories});
	});
}

exports.refine = function(req, res){
	res.render('official/under_construction');
}

exports.search_exec = function(req, res){

}