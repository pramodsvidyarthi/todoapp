var express = require('express');
var path = require('path');
var ejs = require('ejs');

// var routes = require('/views/index');

var server =  express();

server.engine('html',ejs.renderFile);

server.use(express.static(path.join(__dirname)));
server.use(express.static(path.join(__dirname,'/public')));
server.use('/assets',express.static(path.join(__dirname,'/public/bower_components')));

server.set('view engine','html');

server.listen(5000);