var ut = require("../../core/libraries/utils");

exports.apply = function(io){
	 io.sockets.on('connection',function(socket){
    //クライアントからmessageイベントが受信した時
    //console.log(socket);
    socket.on('search',function(data){
      if(data && typeof data.text === 'string'){
        //メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。        

        if(typeof(data.env) != "string"){
          data.env = null;
        }

        //環境設定ファイル読み込み
        if(data.env == "production"){
          require('../../config/environment/production');
        }
        else if(data.env == "development"){
          require('../../config/environment/development');
        }
        else{
          require('../../config/environment/local');
        }

        var article = require("../../models/dao/article");

        article.getCollection().find({japaneseFullTextSearch : ut.toKatakanaCase(data.text)}, function(err, articles){
          if(err){
            throw new Error(err.toString());
          }
          socket.emit("search", articles);
        });
        //socket.broadcast.json.emit('message',{text:data.text});
      }
    });
  }); 
}