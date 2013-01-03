
/*
 * GET home page.
 */

exports.index = function(req, res){
	var article = require('../models/dao/article');

    res.render('index', {title:'Address Book'});
    /*
    var con = new article();
    con.english = "test";
    con.japanese = "テスト"
    con.save(function(err) {
        if(err) throw err;
        res.render('index', {title:'Address Book'});
    });
	*/
};