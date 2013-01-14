var configure = require('../../core/configures/configure');
var databse = require('../../core/configures/database');

//configure.mod('BASE_URL', 'localhost');
configure.add('SYS_ROOT', __dirname.replace("config/environment/", ""));

//If you want to use websocket on reverse proxy, you need to set.
configure.add('websocketsProxyPort', 8888);

/**
* database configuration
*/
databse.add('mongo_master',{
				adapter : 'mongo',
				host : 'host',
				dbName : 'dbname',
				port : 11211,
			});

/*
//TODO we will be able to write below near future.
databse.add('mysql_master',{
				adapter : 'mysql',
				host : 'host',
				dbName : 'dbname',
				port : 11211,
			});
*/