function mbSegmentetor(lang){
	this.lang = "japanese";
}


mbSegmentetor.prototype = {
	getResult : function(){
		return {
			toKatakana : function(string, onCompleteFunc){
				var ut = require("../libraries/utils");
				mbSegmentetor.prototype._stringSegmentExec(string, function(callBack){
		            for(i in callBack){
		                callBack[i] = ut.toKatakanaCase(callBack[i]);
		            }
		            onCompleteFunc(callBack);
		        });
			},
			toHiragana : function(string, onCompleteFunc){
				mbSegmentetor.prototype._stringSegmentExec(string, function(callBack){
		            onCompleteFunc(callBack);
		        });
			}
		}
	},
	_stringSegmentExec : function(string, onCompleteFunc){
		var fs = require('fs');
	    var dat = '';
	    var dic = fs.readFileSync(__dirname + "/../dictionary/japanese.txt").toString().split('\n');
	    var cnt = 0;
	    var callBack = new Array();

	    //改行コード空白は特殊文字として扱う
        //string.replace(/\r\n/g, "<%>");


		var removeLineEndStyle = function(string){
			var newLen = '';
		    for(var i=0; i<string.length; i++){
		        text = escape(string.substring(i, i+1));
		        if(text != "%0D" && text != "%0A"){
		            newLen += string.substring(i, i+1);
		        }else{
		        	newLen += "<%>";
		        }
		    }
		    return newLen;
		}
		
		string = removeLineEndStyle(string);
	    dic.forEach(function(line){
	        cnt++;
	        var match = eval("string.match(/" + line + "/gi)");

	        //改行コードを含んでいるか
	        var isLineEndStyle = function(string){
	        	if(string == "\r" || string == "\n\r" || string == "\n"){
	        		return true;
	        	}
	        	return false;
	        }
	        if(match && match != "<%>"){
	            match = match[0];
	           	callBack.push(match);
	            string = eval("string.replace(/" + match + "/g, '<%>')");
	        }
	        if(dic.length <= cnt){
	            //sortロジック
	            var ex = string.split("<%>");
	            for(ite in ex){
	                if(ex[ite] != ""){
	                    callBack.push(ex[ite]);
	                }
	            }
	            onCompleteFunc(callBack);
	        }
	    });
	}
}


module.exports = mbSegmentetor;