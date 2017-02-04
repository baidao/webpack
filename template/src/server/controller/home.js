module.exports = (function() {
    return {
        context: '',
        handlers: [{
            uri: '/',
            handler: function(req, res) {
                res.send('this is home');
            }
        }]
    };
})();
