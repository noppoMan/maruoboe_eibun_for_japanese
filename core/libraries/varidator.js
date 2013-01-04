/*********************************************
* utilFunctions.js
**********************************************/

var uf = require("../libraries/utils");


function varidator(){
	this.errors = {};
};

varidator.prototype = {
	applyRule : function(options){
		if(!uf.isset(options.rule)){

		}
		for(key in options){
			if(typeof(this.ruleMethods[options + "Check"]) == "undefined"){
				return;
			}

			this.ruleMethods[options + "Check"]();

		}
	},
	addError : function(errorNumber, options){
		//this.errors =  
	},
	ruleMethods : {
		notEmptyCheck : function(){

		}
	}
}
