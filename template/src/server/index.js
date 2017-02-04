var path = require('path');
var express = require('express');
var app = require('./app');

app.init().use(express.static(path.resolve(__dirname, '../client')));
app.startup();
