var configure = require("../../core/configures/configure");

exports.link = function(path, innerHtml, options){
	var addInfo = "";
	if(typeof(arguments[2]) != "undefined"){
		for(key in options){
			addInfo += key + "='" + options[key] + "' ";
		}
	}
	return "<a href='" + configure.get("BASE_URL") + path + "'" + addInfo +">" + innerHtml + "</a>";
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
			tag = "<img src='" + configure.get("BASE_URL") + "images" + "/" + path + "' " + addInfo + ">";
			break;
		case "css" : 
			tag = "<link href='" + configure.get("BASE_URL")  + "stylesheets" + "/" + path + "' " + addInfo + ">";
			break;
		case "js" :
			tag = "<script src='" + configure.get("BASE_URL")  + "javascripts" + "/" + path + "' " + addInfo + "></script>";
			break;
	}
	return tag;
}


exports.dateFormat = function(date){
	var string = date.toString();
	var spt = string.split(" ");
	return spt[1] + "/" + spt[2] + "/" + spt[3] + " " + spt[4];
}