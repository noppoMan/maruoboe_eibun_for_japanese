exports.init = function(env){
	if(typeof(env) == "undefined"){
		env = null;
	}
	//環境設定ファイル読み込み
	if(env == "production"){
	  require('./environment/production');
	}
	else if(env == "development"){
	  require('./environment/development');
	}
	else{
	  require('./environment/local');
	}
}