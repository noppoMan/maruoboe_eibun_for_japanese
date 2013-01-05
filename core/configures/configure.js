var configure = {
	config : {},
	add : function(key, value){
		this.config[key] = value;
	},
	get : function(key){
		if(typeof(this.config[key]) == "undefined"){
			return false;
		}
		return this.config[key]
	},
	mod : function(key, value){
		this.config[key] = value;
	}
};
module.exports = configure;