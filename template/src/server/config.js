module.exports = {
    load() {
        if (process.env.my_config) {
            let myConfig = require(process.env.my_config);
            Object.assign(this, myConfig);
        }
        return this;
    },
    debug: false,
    port: '8080'
};
