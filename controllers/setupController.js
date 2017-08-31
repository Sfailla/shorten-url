var Url = require('../models/dbModel');
var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('public/index.html', { root: __dirname });
    });

    app.get('/short/:url(*)', (req, res) => {
        var params = req.params.url;
        var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        Url.findOne({ "url": params }, { short: 1, _id: 0 }, function(err, document) {
            if (document != null) {
                res.json({ original_url: params, short_url: document.short });
            } else {
                if (document == null) {
                    if (regex.test(params)) {
                        var shortCode = shortid.generate();
                        var newUrl = { url: params, short: shortCode };
                
                        Url.create(newUrl, function(err, results) {               
                            res.end();
                        });                  
                    } else {
                        res.json('Please use a valid web address');
                    }
                }
            }
        });

    });

    app.get('/:short', function(req,res) {
        var params = req.params.short;

        Url.findOne({ "short": params }, { url: 1, _id: 0 }, function(err, url) {
            if (url != null) {
                res.redirect(url.url);
            } else {
                res.json({ error: "No shortlink found in database" });
            }
        });
    });

    app.delete('/short', function(req, res) {
        Url.findOneAndRemove({ id: req.params.id }, function(err) {
            if (err) console.log(err);
            res.send('success: deleted');
        });
    });

}