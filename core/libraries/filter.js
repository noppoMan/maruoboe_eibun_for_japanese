var regsterd = new Array();
exports.req = {};
exports.add = function(func){
	regsterd.push(func);
}

exports.run = function(){
	for(i in regsterd){
		regsterd[i](exports.req);
	}
	regsterd = new Array();
}