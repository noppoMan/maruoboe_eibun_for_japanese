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
			var url = (path.match(/http/)) ? path :  configure.get("BASE_URL") || '' + "images" + "/" + path;
			tag = "<img src='" + url + "' " + addInfo + ">";
			break;
		case "css" : 
			var url = (path.match(/http/)) ? path :  configure.get("BASE_URL") || ''   + "stylesheets" + "/" + path;
			tag = "<link href='" + url + "' " + addInfo + ">";
			break;
		case "js" :
			var url = (path.match(/http/)) ? path :  configure.get("BASE_URL") || ''   + "javascripts" + "/" + path;
			tag = "<script src='" + url + "' " + addInfo + "></script>";
			break;
	}
	return tag;
}


exports.dateFormat = function(date){
	var string = date.toString();
	var spt = string.split(" ");
	return spt[1] + "/" + spt[2] + "/" + spt[3] + " " + spt[4];
}


exports.toEmpty = function(string){
  if(string == false || string == null){
    return "";
  }
  return string;
}