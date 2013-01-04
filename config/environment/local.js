var appConfig = require('../appConfig');
var databse = require('../database');


appConfig.add('BASE_URL', 'http://localhost:3000/');
appConfig.add('SYS_ROOT', __dirname.replace("config/environment/", ""));


/**
* database configuration
*/
databse.add('mongo_master',{
				adapter : 'mongo',
				host : 'localhost',
				dbName : 'maruoboe_eibun',
				port : null,
			});