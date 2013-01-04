
/*
 * GET home page.
 */

exports.index = function(req, res){
	var facadeArticle = require('../models/facades/facadeArticle');
    //var mbSegmentetor = require('../core/libraries/mbSegmentetor');
/*    var uf = require('../core/libraries/utils');
    uf.async(
        function(){

        },
        function(string, method, callBack){

        },
        function(callBack){

        }
    );
*/

    var serachWord = req.query.search_word;

    var options = {};
    if(serachWord != undefined){
        options.searchWord = serachWord;
    }

    //ms = new mbSegmentetor();
    //ms.getResult2Katakana("これいくらですか？", function(result){
            facadeArticle.getDocument(function(object){
                res.render('index', {title:'Address Book', result : object.result});
            }, options);
    //});

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