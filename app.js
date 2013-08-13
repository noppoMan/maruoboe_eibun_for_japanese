/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , expressLayouts = require('express-ejs-layouts')
  , http = require('http')
  , path = require('path')
  , httpRequest = require("./core/networks/httpRequest")
  , configure = require("./core/configures/configure")
  , dynamicRouter = require("express-dynamic-router")
  ;


var app = express();

var program = require('commander');
program
  .option('-e, --environment [environment]', 'environment')
  .option('-p, --port [port]', 'listening port. default 3001')
  .option('-l, --listen [listen]', 'listening address. default 0.0.0.0. set :: if listening ipv6')
  .parse(process.argv);


var mode = program.environment || 'developemnt';
require('./config/environment/'+ mode);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('layout', 'base');

  app.locals.helper = require('./core/libraries/viewHelper');

  app.use(expressLayouts)
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

dynamicRouter
.index(require('./routes/index').index)
.register(app);

//httpサーバー
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("MikeTOKYO meets node.js server listening on port " + app.get('port'));
});
configure.add("port", app.get('port'));

//socket.ioのインスタンス作成
var io = require('socket.io').listen(server);

//websocket
require("./models/socket.io/search").apply(io);
require("./models/socket.io/tag").apply(io);