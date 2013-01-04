var appConfig = require("../../config/appConfig");

exports.link = function(){
	
}


exports.loader = function(type, path, options){
	var tag = "";
	var addInfo = "";
	if(typeof(arguments[2]) != "undefined"){
		for(key in options){
			addInfo += key + "='" + options[key] + "' ";
		}
	}
	switch(type){
		case "img" :
			tag = "<img src='" + appConfig.get("BASE_URL") + "images" + "/" + path + "' " + addInfo + ">";
			break;
		case "css" : 
			tag = "<link href='" + appConfig.get("BASE_URL")  + "stylesheets" + "/" + path + "' " + addInfo + ">";
			break;
		case "js" :
			tag = "<script src='" + appConfig.get("BASE_URL")  + "javascripts" + "/" + path + "' " + addInfo + "></script>";
			break;
	}
	return tag;
}