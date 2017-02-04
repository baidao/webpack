let config = require('./config').load();
let path = require('path');
let glob = require('glob');
let express = require('express');
let bodyParser = require('body-parser');

let application = (function() {
    let _server = express();
    let _config = {
        port: 8080
    };
    return {
        init: function() {
            let router = express.Router();
            glob.sync(path.resolve(__dirname, './controller/*.js')).forEach(function(file) {
                let controller = require(file);
                controller.handlers.forEach(function(handler) {
                    let uri = controller.context + handler.uri;
                    let method = handler.method || 'get';
                    router[method](uri, handler.handler);
                });
            });
            _server.use(bodyParser.json());
            _server.use(bodyParser.urlencoded({ extended: true }));
            _server.use(router);
            _server.use(function(err, req, res, next) {
                console.error(err.stack);
                res.status(err.code || 500);
                res.send(err.message || 'Internal Server Error');
            });
            return _server;
        },
        startup: function(options) {
            options = Object.assign({}, config, options);
            _server.listen(options.port, function(err) {
                if (options.callback) {
                    options.callback(err);
                } else {
                    if (err) {
                        console.info(`fail to startup server: ${err}`);
                    } else {
                        console.info(`server is startup on ${options.port}`);
                    }
                }
            });
        }
    }
})();

module.exports = application;
