exports.init = function(req){
	var configure = require("../core/configures/configure");
	configure.add("BASE_URL", req.protocol + "://" + req.headers.host + "/");

	//環境設定ファイル読み込み
	if(req.host == "production.hogehoge.com"){
	  require('./environment/production');
	}
	else if(req.host == "dev.hogehoge.com"){
	  require('./environment/development');
	}
	else{
	  require('./environment/local');
	}
}