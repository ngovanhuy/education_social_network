var express = require('express');
var app = express();

app.use(function(req, res) {
    if (Number(req.headers['content-length']) > (1 << 28)) {
        console.log("TRUE");
    }
    res.end();
});

app.listen(9998);