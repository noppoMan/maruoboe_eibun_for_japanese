/**
* 同期処理実現パターンクラス
*/
function sync(){

}

sync.prototype = {
	vars : {},
	merge : function(val){
		for(key in val){
			sync.prototype.vars[key] = val[key];
		}
	},
	pipe : function (callbacks, done) {
		var counter = callbacks.length;
		//シングルスレッドのため、必ず初期化する
		//怠った場合バッファが溢れる
		sync.prototype.vars = null;
		sync.prototype.vars = {};
		var next = function() {
			if (--counter == 0) {
				done(sync.prototype.vars );
			}
		};
		for (var i=0; i < callbacks.length; i++) {
			callbacks[i](next);
		}
	},
	getVars : function(key){
		if(typeof(arguments[0]) != "undefined"){
			return sync.prototype.vars[key];
		}
		return sync.prototype.vars;
	},
	exit : function(){
		sync.prototype.pipe = null;
	} 
}

module.exports = sync;