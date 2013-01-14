/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , expressLayouts = require('express-ejs-layouts')
  , http = require('http')
  , path = require('path')
  , rc = require("./config/routing")
  , httpRequest = require("./core/networks/httpRequest")
  , configure = require("./core/configures/configure");


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('layout', 'base');
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

app.get('/', routes.index);
require("./core/autoRouting").getSet(rc.get, app);
require("./core/autoRouting").postSet(rc.post, app);

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