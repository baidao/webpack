var path = require('path');
var express = require('express');
var app = require('./app');

var port = process.env.npm_package_config_port || '8080';
app.init().use(express.static(path.resolve(__dirname, '../client')));
app.startup({
    port
});
