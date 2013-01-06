var getReq = function(reqParam){
    return (reqParam != undefined) ? reqParam : false;
};


exports.edit = function(req, res){
    var options ={};
    var facadeArticle = require('../models/facades/facadeArticle');
    options.articleId = getReq(req.query.articleId);

    facadeArticle.getDetail(function(result){
        if(result.hasError){
            if(result.errors.code == 1){
                res.render('article/add', {errors : result.errors, categories : result.categories, formValues : options, mode : "update"});    
            }else{
                res.render('errors/index');
            }
        }else{
            //何もなければ
            res.render('article/add', {errors : {}, categories : result.categories, formValues : result.formValues, mode : "update"});
        }
    }, options);
}



exports.add = function(req, res){

    var options = {};
    options.englishSentence = false;
    options.japaneseSentence = false;
    options.category = false;
    options.soundFileUrl = false;
    options.mode = false;

	var facadeSearch = require('../models/facades/facadeSearch');
	facadeSearch.getCategory(function(vars){
		res.render('article/add', {errors : {}, categories : vars.categories, formValues : options, mode : "add"});
	});
}

exports.save_exec = function(req, res){
    var facadeArticle = require('../models/facades/facadeArticle');
    var options = {};
    options.articleId = getReq(req.body.articleId);
    options.englishSentence = getReq(req.body.englishSentence);
    options.japaneseSentence = getReq(req.body.japaneseSentence);
    options.category = getReq(req.body.category);
    options.soundFileUrl = getReq(req.body.soundFileUrl);
    options.mode = getReq(req.body.mode);
    facadeArticle.saveData(function(result){
        if(result.hasError){
            res.render('article/add', {errors : result.errors, categories : result.categories, formValues : options, mode : options.mode});
        }else{
            //何もなければ結果ページへ
            res.redirect('article/result');
        }
    }, options);
}


exports.result = function(req, res){
	res.render('article/result');
}


exports.list = function(req, res){
	var facadeArticle = require('../models/facades/facadeArticle');
    var options = {};
    options.searchWord = getReq(req.query.search_word);
    options.category  = getReq(req.query.category);
    facadeArticle.getList(function(result){
        res.render('index', {result : result.articles});
    }, options);
}