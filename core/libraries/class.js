/*********************************************
* class.js
* use for like a clasBase oop programing.
**********************************************/

/**
* function extend
* @param function subC
* @param function superC
*/
exports.extend = function(subC, superC){
	subC.prototype = Object.create(superC.prototype);
	subC.prototype.constructor = subC;
	return subC;
}

/**
* object getExtendedInstance
* @param function subC
* @param function superC
*/
exports.getExtendedInstance = function(subC, superC){
	subC.prototype = Object.create(superC.prototype);
	subC.prototype.constructor = subC;
	return new subC();
}

/**
* object modelInit
* @param function subC
* @param string connectionName
* @param string colName
* @param object schema
*/


var cache = {
	
}

exports.modelInit = function(subC, connectionName, colName, schema){
	var model = this.getExtendedInstance(subC, require("../db/model"));
	model.createConnection(connectionName);
	return model.getCollection(colName, schema);
}


exports.addMethod = function(leftSide, rightSide){
	eval(leftSide + "=" + rightSide);
}



exports.moduleInit = function(path){
	return new path;
}