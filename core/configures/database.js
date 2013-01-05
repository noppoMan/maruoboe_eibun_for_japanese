var database = {
	config : {},
	add : function(key, object){
		this.config[key] = object;
	},
	get : function(key){
		if(typeof(this.config[key]) == "undefined"){
			return null;
		}
		return this.config[key]
	}
}
module.exports = database;