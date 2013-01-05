var httpRequest = {
	req : {},
	getItem : function(key){
		return this.req[key];
	}
}

module.exports = httpRequest;