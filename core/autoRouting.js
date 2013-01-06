var _autoSet = function(map, app, method){
	//動的ルーティングセット
	var moduleCaches = {};
	for(i in map){
		var spt = map[i].split(".");
		if(spt[0] != "routes"){
			eval("moduleCaches." + spt[0] + " = require('../routes/" +  spt[0] + "')");
			if(typeof(moduleCaches[spt[0]][spt[1]]) == "function"){
				if(method == "get"){
					app.get(i, moduleCaches[spt[0]][spt[1]]);
				}
				else if(method == "post"){
					app.post(i, moduleCaches[spt[0]][spt[1]]);
				}
			}
		}
	}
}

exports.getSet = function(map, app){
	_autoSet(map, app, "get");
}

exports.postSet = function(map, app){
	_autoSet(map, app, "post");
}


/*var express = require('express');
var app = express();
//app.get('/article/add', article.add);

exports.run = function(req){
	var _urlSegments = req.url.split("?");
	var urlSegments = _urlSegments[0].split(".");

	var statics =　[
	                "js",
	                "css",
	                "png", 
	                "jpeg", 
	                "jpg", 
	                "gif", 
	                "ttf", 
	                "mp3", 
	                "ico", 
	                "pdf", 
	                "json", 
	                "xml", 
	                "woff", 
	                "swf", 
	                "svg"
	              ];
	var isDynamic = true;
	for(ite in statics){
	  if(urlSegments.indexOf(statics[ite]) != -1){
	    isDynamic = false;
	    break;
	  }
	}
	if(!isDynamic){
		return;
	}

	var controller = null;
  	var us = _urlSegments[0].split("/");
  	controller = require("../routes/" + us[1]);
	app.get(us[1] + '/' + us[2], controller[us[2]]);
}*/











