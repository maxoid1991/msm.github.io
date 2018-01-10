var express = require('express');
var app = express();

let mass = [
	{"name": "John", "age":31, "city":"New York"},
	{"name": "Ted", "age":32, "city": "California"},
];

app.get('/', function (req, res) {
  res.send(mass);
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});