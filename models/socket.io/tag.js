var getEnv = function(data){
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
}


exports.apply = function(io){
  

  io.sockets.on('connection',function(socket){
    //クライアントからmessageイベントが受信した時
    //console.log(socket);
    socket.on('tagsave',function(data){
      if(data && typeof data.text === 'string'){
        //メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。        

        getEnv(data);

        var tag = require("../../models/dao/tag");
        var tagSequence = require("../../models/dao/tagSequence");

        tag.getCollection().find({name:data.text}, function(err, res){
          if(err){
            throw new Error(err.toString());
          }
          if(res.length <= 0){
            tagSequence.increment(function(id){
              var obj = tag.getCollection();
              var con = new obj();
              
              con.id = id;
              con.name = data.text;

              var charArray = new Array();
              var tmp = "";
              for(var i = 0; i < data.chars.length; i++){
                tmp += data.chars[i];
                charArray.push(tmp);
              }
              con.chars = charArray;
              con.save(function(err) {
                  if(err){
                    throw new Error("tag insert Error occured : " + err.toString());
                  }
                  socket.emit("tagsave", {state:1, tag : data.text});
                  socket.broadcast.emit("tagsave", {state:1, tag : data.text});
              })
            });
          }else{
            socket.emit("tagsave", {state:2});
          }
        })
      }
    });

    //検索
    socket.on('tagsearch',function(data){

      console.log(data.chars);

      getEnv(data);

      var tag = require("../../models/dao/tag");
      var tagSequence = require("../../models/dao/tagSequence");


      tag.getCollection().find({chars : data.chars}, function(err, res){
          if(err){
            throw new Error(err.toString());
          }
          socket.emit("tagsearch", {tags : res});
        });
    });
  }); 
}