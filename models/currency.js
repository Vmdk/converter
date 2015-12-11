var mongoose = require('mongoose');
var currencySchema = mongoose.Schema({
        name         : String,
        rate         : Number
});

module.exports = mongoose.model('Currency', currencySchema);
