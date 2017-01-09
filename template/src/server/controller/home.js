module.exports = (function () {
    return {
        uri: '/',
        handler: function (req, res) {
            res.send('this is home');
        }
    };
})();
