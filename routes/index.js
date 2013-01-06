
/*
 * GET home page.
 */

exports.index = function(req, res){
	var facadeArticle = require('../models/facades/facadeArticle');
    var options = {};
    facadeArticle.getList(function(result){
        res.render('index', {title:'Address Book', result : result.articles});
    }, options);
};