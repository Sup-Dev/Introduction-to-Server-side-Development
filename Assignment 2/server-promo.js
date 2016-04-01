var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    // create a new dish
    Promotions.create({
        name: 'Weekend Grand Buffet',
        description: 'Featuring . . .',
        price: "19.99",
        image: "images/buffet.png"
    }, function (err, promo) {
        if (err) throw err;
        console.log('Promo created!');
        console.log(promo);

        var id = promo._id;

        // get all the dishes
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test',
                        label: "New"
                    }
                }, {
                    new: true
                })
                .exec(function (err, promo) {
                    if (err) throw err;
                    console.log('Updated Promo!');
                    console.log(promo);

                    db.collection('promotions').drop(function () {
                        db.close();
                    });
                });
        }, 3000);
    });
});