var database = {
	config : {},
	add : function(key, object){
		this.config[key] = object;
	},
	get : function(key){
		return this.config[key]
	}
}
module.exports = database;