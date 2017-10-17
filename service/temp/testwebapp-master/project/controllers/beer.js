var Beer = require('../models/beer');

exports.postBeers = function (req, res) {
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.userId = req.user._id;

    beer.save(function (err) {
        if (err) {
            res.send(err);
        }

        res.json({ message: 'Beer added to the locker!', data: beer });
    });
};

exports.getBeers = function (req, res) {
    Beer.find(function (err, beers) {
        if (err) {
            res.send(err);
        }
        res.json(beers);
    });
};

exports.getBeer = function (req, res) {
    Beer.findById(req.params.beer_id, function (err, beer) {
        if (err) {
            res.send(err);
        }
        res.json(beer);
    });
};

exports.putBeer = function (req, res) {
    // Use the Beer model to find a specific beer
    Beer.findById(req.params.beer_id, function (err, beer) {
        if (err) {
            res.send(err);
        }
        // Update the existing beer quantity
        beer.quantity = req.body.quantity;

        // Save the beer and check for errors
        beer.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(beer);
        });
    });
};

exports.deleteBeer = function (req, res) {
    // Use the Beer model to find a specific beer and remove it
    Beer.findByIdAndRemove(req.params.beer_id, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Beer removed from the locker!' });
    });
};