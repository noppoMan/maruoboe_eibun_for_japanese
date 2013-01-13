exports.do = function(io){
	//クライアントから接続があった時
	io.sockets.on('connection',function(socket){
	  //クライアントからmessageイベントが受信した時

	  socket.on('message',function(data){
	    if(data && typeof data.text === 'string'){
	      //メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。

			console.log(data);

	      //socket.broadcast.json.emit('message',{text:data.text});
	    }
	  });

	});	
}