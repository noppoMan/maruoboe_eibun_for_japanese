exports.add = function(req, res){
	var facadeSearch = require('../models/facades/facadeSearch');
	facadeSearch.getCategory(function(vars){
		res.render('article/add', {categories : vars.categories});
	});
}

exports.add_exec = function(req, res){
	
}


exports.result = function(req, res){
	
}


exports.list = function(req, res){
	var facadeArticle = require('../models/facades/facadeArticle');
    var options = {};
    var getReq = function(reqParam){
        return (reqParam != undefined) ? reqParam : false;
    };
    options.searchWord = getReq(req.query.search_word);
    options.category  = getReq(req.query.category);
    facadeArticle.getList(function(result){
        res.render('index', {result : result.articles});
    }, options);
}