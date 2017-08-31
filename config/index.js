var configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds163613.mlab.com:63613/shorturi';
    }
};