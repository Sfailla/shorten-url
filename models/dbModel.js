var mongoose = require('mongoose');


    var urlSchema = mongoose.Schema({
        url: {
            type: String,
            unique: true 
        }, 
        short: {
            type: String,
            unique: true
        },
        create_date: {
            type: Date,
        default: Date.now
        }
    }, { collection: 'links' }); 


Url = module.exports = mongoose.model('Url', urlSchema);