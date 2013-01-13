/*********************************************
* utilFunctions.js
* 
**********************************************/


/**
* bool isset
* @param mixed val
*/
exports.isset = function(val){
	if(typeof(val) != "undefined"){
		return true;
	}
	return false;
}

/**
* bool empty
* @param mixed val
*/
exports.empty = function(val){
	if(val == null || val == "" || val == false){
		return true;
	}
	return false;
}

/**
* bool inArray
* @param array or object arr
* @param int or string key
*/
exports.inArray = function(arr, key){
	for (keys in arr) {
		if (keys == key) return true;
	}
	return false;
}


exports.toKatakanaCase = function(string){
    var i, c, a = [];
    for(i=string.length-1;0<=i;i--)
    {
        c = string.charCodeAt(i);
        a[i] = (0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c;
    };
    return String.fromCharCode.apply(null, a);
};