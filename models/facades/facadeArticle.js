var _sync = require("../../core/libraries/sync");
var article = require("../dao/article");
var mbSegmentetor = require('../../core/libraries/mbSegmentetor');

var facadeArticle = {
	getList : function(callBack, options){

		var sync = new _sync();
		var args = {fields : {}, conditions : {}, other : {limit : 20, sort : {modified: -1}}};


		var whereCreate = function(next){
			if(options.keyword){
				var ms = new mbSegmentetor();
				ms.getResult().toKatakana(options.keyword, function(callBack){
					var or = {$or : new Array()}
					var cnt = 0;
					for(key in callBack){
						or['$or'][cnt] = {japaneseFullTextSearch : callBack[key]};
						cnt++;
					}
					sync.merge({conditions : or});
					next();
				});
			}else if(options.category){
				args.conditions.categoryId = options.category;
				sync.merge({conditions : args.conditions});
				next();
			}else{
				next();
			}
		}

		var getArticle = function(next){
			article.getCollection().find(sync.getVars('conditions'), args.fields,args.other,
					function(err, articles){
						if(err){
							throw new Error(err.toString());
						}
						sync.merge({articles : articles});
						next();
					});
		}
		var done = function(vars){
			callBack(vars);
		}
		sync.pipe([whereCreate, getArticle], done);
	},
	saveData : function(callBack, options){

		var sync = new _sync();

		var errorHandling = function(){
			var errors = {};

			//エラーハンドリングを行う
			if(options.englishSentence == false){
				errors.englishSentence = {
											message : "englishSentenceは必須項目です。",
										 }
			}

			if(options.japaneseSentence == false){
				errors.japaneseSentence = {
											message : "japaneseSentenceは必須項目です。",
										 }
			}

			if(Object.keys(errors).length){
				var facadeSearch = require('./facadeSearch');
				facadeSearch.getCategory(function(result){
					callBack({hasError : true, errors : errors, categories : result.categories});
				});
			}else{

				/*エラーが無ければ保存処理を行う*/

				//日本語を意味のあるも単語に分割する
				var getSegmentedInput = function(next){
					var ms = new mbSegmentetor();
					try{
						ms.getResult().toKatakana(options.japaneseSentence, function(callBack){
							sync.merge({segmented : callBack, hasError : false});
							next();
						});
					}catch(e){
						throw new Error(e.toString());
					}
				}

				//記事保存
				var save = function(next){
					var articleSequence = require("../dao/articleSequence");
					

					if(options.mode == "update"){
						try{
							var set = {
								english : options.englishSentence,
								japanese : options.japaneseSentence,
								japaneseFullTextSearch : sync.getVars("segmented"),
								soundFilePath : options.soundFileUrl,
								categoryId : options.category
							}
							article.getCollection().update({id : options.articleId}, set, function(err) {
								if(err){
									throw new Error(err.toString());
								}
								next();
							});
						}catch(e){
							throw new Error(e.toString());
						}
					}else{
						try{
							//シーケンスidをインクリメント
							articleSequence.increment(function(id){
								//記事を保存する
								var obj = article.getCollection();
								var con = new obj();
								con.id = id;
								con.english = options.englishSentence;
								con.japanese = options.japaneseSentence;
								con.japaneseFullTextSearch = sync.getVars("segmented");//options.japaneseSentence;
								con.soundFilePath = options.soundFileUrl;
								con.categoryId = options.category;
								con.save(function(err) {
	        						if(err){
	        							throw new Error("article insert Error occured : " + err.toString());
	        						}
	        						next();
	    						})
							});
						}catch(e){
							throw new Error(e.toString());
						}
					}
				}
				var done = function(vars){
					callBack(vars);
				}
				//同期的にロジックを実行
				sync.pipe([getSegmentedInput, save], done);
			}
		}();
	},
	getDetail : function(callBack, options){
		var errors = {};
		//エラーハンドリングを行う
		if(options.articleId == false){
			errors = { message :  "不正なidです", code : 0};
		}
		if(Object.keys(errors).length){
			var facadeSearch = require('./facadeSearch');
			facadeSearch.getCategory(function(result){
				callBack({hasError : true, errors : errors});
			});
		}else{
			article.getCollection().find({id : options.articleId},{},{limit : 1},
				function(err, result){
					if(err){
						throw new Error(err.toString());
					}

					if(Object.keys(result).length <= 0){
						errors = { message :  "不正なidです", code : 0};
						callBack({hasError : true, errors : errors});
						return;
					}

					var res = result[0];
					var formValues = {};
					formValues.articleId = res.id;
					formValues.englishSentence = res.english;
					formValues.japaneseSentence = res.japanese;
					formValues.soundFileUrl = res.soundFilePath;
					formValues.category = res.categoryId;

					var facadeSearch = require('./facadeSearch');
					facadeSearch.getCategory(function(result){
						callBack({hasError : false, formValues : formValues, categories : result.categories});
					});
				});
		}
	}
}
module.exports = facadeArticle;