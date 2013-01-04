var appConfig = {
	config : {},
	add : function(key, object){
		this.config[key] = object;
	},
	get : function(key){
		return this.config[key]
	}
};
appConfig.config.BASE_URL = "";
module.exports = appConfig;