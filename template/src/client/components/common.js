import Vue from 'vue';
import VueResource from 'vue-resource';
/* global baseUrl */
Vue.use(VueResource);
let api = function(target) {
    if (baseUrl === '/') {
        return target;
    }
    return baseUrl + target;
};

module.exports = (function() {
    return {
        params: (function() {
            let result = {};
            if (window.location.search) {
                window.location.search.substr(1).split('&').forEach((kv) => {
                    kv = kv.split('=');
                    result[kv[0]] = kv[1];
                });
            }
            return result;
        })(),
        getCookie(name) {
            if (document.cookie.length > 0) {
                let start = document.cookie.indexOf(name + '=');
                if (start !== -1) {
                    start = start + name.length + 1;
                    let end = document.cookie.indexOf(';', start);
                    if (end === -1) {
                        end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(start, end));
                }
            }
            return '';
        },
        http: {
            _error: function(error) {
                return function(response) {
                    if (error && error(response)) {
                        return;
                    } else {
                        console.info('error', response);
                    }
                };
            },
            get: function(url, params, success, error) {
                Vue.http.get(api(url), {
                    params: params || {},
                    timeout: 3000
                }).then(function(response) {
                    success(response.data);
                }, this._error(error));
            },
            delete: function(url, success, error) {
                Vue.http.delete(api(url), {
                    timeout: 3000
                }).then(function(response) {
                    success(response.data);
                }, this._error(error));
            },
            post: function(url, body, success, error) {
                Vue.http.post(api(url), body, {
                    timeout: 3000
                }).then(function(response) {
                    success(response.data);
                }, this._error(error));
            },
            put: function(url, body, success, error) {
                Vue.http.put(api(url), body, {
                    timeout: 3000
                }).then(function(response) {
                    success(response.data);
                }, this._error(error));
            },
            patch: function(url, body, success, error) {
                Vue.http.patch(api(url), body, {
                    timeout: 3000
                }).then(function(response) {
                    success(response.data);
                }, this._error(error));
            }
        }
    };
})();
