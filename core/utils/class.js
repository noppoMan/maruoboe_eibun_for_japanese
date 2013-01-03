exports.extend = function(subC, superC){
	subC.prototype = Object.create(superC.prototype);
	subC.prototype.constructor = subC;
	return subC;
}

exports.getExtendedInstance = function(subC, superC){
	subC.prototype = Object.create(superC.prototype);
	subC.prototype.constructor = subC;
	return new subC();
}

exports.modelInit = function(subC, superC, connectionName, colName, schema){
	var model = this.getExtendedInstance(subC, superC);
	model.createConnection(connectionName);
	return model.getCollection(colName, schema);
}