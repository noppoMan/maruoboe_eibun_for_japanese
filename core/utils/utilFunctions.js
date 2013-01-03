var utilFunctions = {
	isset : function(val){
		if(typeof(val) != "undefined"){
			return true;
		}
		return false;
	},
	empty : function(val){
		if(val == null || val == "" || val == false){
			return true;
		}
		return false;
	},
	inArray : function(arr, key){
		for (keys in arr) {
    		if (keys == key) return true;
		}
		return false;
	}
}

module.exports = utilFunctions;