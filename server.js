var express = require('express');
var app = express();
//var connect = require('connect'); #aria do we need this?
var sharejs = require('share').server;
//var renderer = require('share').renderer;

// Configure ejs engine
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

//app.set()

// Force HTTPS on stackedit.io
// app.all('*', function(req, res, next) {
//     if (req.headers.host == 'stackedit.io' && req.headers['x-forwarded-proto'] != 'https') {
//         res.redirect('https://stackedit.io' + req.url);
//     }
//     else {
//         next();
//     }
// });

// Use gzip compression
//app.use(express.compress());

// Serve static resources
// app.use(express.static(__dirname + '/public'));

// // Serve viewer.html in /viewer
// app.get('/viewer', function (req, res) {
//     res.render('viewer.html');
// });

// app.get('/websocket', function (req, res) {
//     console.log('req', req);
//     console.log('res', res);
// });

// Setup ShareJS
var options = {
  db: {type: 'none'},
  browserChannel: {cors: '*'}
};
sharejs.attach(app, options);


app.get('/', function(req, res, next) {
  var docName;
  docName = req.params.docName;
  renderer(docName, app.model, res, next);
});

// // Error 404
// app.use(function(req, res, next) {
//     res.status(404);
//     res.render('error_404.html');
// });

// Listen on port 3000
var port = process.env.PORT || 3000;
app.listen(port, null, function() {
    console.log('Server started: http://localhost:' + port);
});
