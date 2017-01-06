var express = require('express');

var application = (function () {
    var _server = express();
    var _config = {
        port: 8080
    };
    return {
        init: function () {
            _server.get('/', function (req, res) {
                res.send('hello world');
            });
            return _server;
        },
        startup: function (options) {
            options = Object.assign({}, _config, options);
            _server.listen(options.port, function (err) {
                if (err) {
                    console.info(`fail to startup server: ${err}`);
                } else {
                    console.info(`server is startup on ${options.port}`);
                }
            });
        }
    }
})();

module.exports = application;
