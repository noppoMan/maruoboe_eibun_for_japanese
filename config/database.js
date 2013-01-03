exports.getDBConnectInfo = function(connectionName){
	switch(connectionName){
		case "mongo_master":
			return {
				adapter : 'mongo',
				host : 'localhost',
				dbName : 'maruoboe_eibun',
				port : null
			}
		default:
			return {
				adapter : 'mongo',
				host : 'localhost',
				dbName : 'mike_tokyo',
				port : null
			}
	}
}