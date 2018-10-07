var express = require('express');
var app = express();
var parser = require('ua-parser-js')

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.enable('trust proxy')

app.get('/whoami', function(req, res) {
  const ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
  const language = req.get('accept-language')
  const software = parser(req.headers['user-agent'])
  res.json({
    "ipaddress": ip,
    "language": language.split(',')[0],
    "software": JSON.stringify(software)
  })
})

var listener = app.listen(process.env.PORT || 4400, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
