var configure = require('../../core/configures/configure');
var databse = require('../../core/configures/database');

//configure.mod('BASE_URL', 'localhost');
configure.add('SYS_ROOT', __dirname.replace("config/environment/", ""));


/**
* database configuration
*/
databse.add('mongo_master',{
				adapter : 'mongo',
				host : 'host',
				dbName : 'dbname',
				port : 11211,
			});