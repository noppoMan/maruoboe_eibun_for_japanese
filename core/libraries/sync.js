/**
* 同期処理実現パターンクラス
*/
var sync = {
	vars : {},
	merge : function(val){
		for(key in val){
			this.vars[key] = val[key];
		}
	},
	pipe : function (callbacks, done) {
		var counter = callbacks.length;
		//シングルスレッドのため、必ず初期化する
		//怠った場合バッファが溢れる
		this.vars = null;
		this.vars = {};
		var next = function() {
			if (--counter == 0) {
				done(sync.vars);
			}
		};
		for (var i=0; i < callbacks.length; i++) {
			callbacks[i](next);
		}
	}
}

module.exports = sync;