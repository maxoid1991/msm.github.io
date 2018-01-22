var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require('./auth');

app.use(bodyParser.json());

let mass = [
	{"name": "John", "age": 21, "city":"New York"},
  {"name": "Ted", "age":32, "city": "California"},
  {"name": "Stas", "age":17, "city": "Los Angeles"},
  {"name": "Tim", "age":44, "city": "Alabama"},
  {"name": "Rojer", "age":27, "city": "Uta"},
  {"name": "Linda", "age":23, "city": "Texas"},
];


app.get('/', function (req, res) {
  res.send(mass);
});

//Authorization test data
app.post('/auth_login', function (req, res) {
  res.send(auth.Auth(req.body));
});



app.post('/save', function (req, res) {
  console.log(req.body);
  mass.splice(0, mass.length);
  mass = req.body;
  console.log(mass);
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});