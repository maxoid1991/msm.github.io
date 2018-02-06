var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require('./auth');

app.use(bodyParser.json());

let mass = [
	{
    "login": "test_login",
    "password" : "test",
    "email": "shameless.cansol@gmail.com",
    "info" : [
        {"name" : "John_test", "age" : 21, "city" : "New York"},
        {"name": "Ted_test", "age":32, "city": "California"}
    ]
}
];

let mass2 = [];
let id = 0;

app.get('/', function (req, res) {
  if(id === 0) {
    res.send(mass)
  } else {
    res.send(mass2)
  }
});

//Logout function;

app.post('/auth_logout', function(req, res){
  id = req.body[0];
  res.send(true);
});

//Authorization test data
app.post('/auth_login', function (req, res) {
  console.log(mass);
  res.send(auth.Auth(req.body));
  id = auth.Auth(req.body);
  id = id[0].id;
  mass2 = auth.Auth(req.body);
  console.log(id);
});

//Registration
app.post('/registration', function(req, res){
  res.send(auth.Reg(req.body));
  console.log(auth.Reg(req.body));
})

//Save Updated data ??????????????????????

app.post('/save', function (req, res) {
  let change = auth.newInfo(req.body);
  id = auth.newInfo(req.body).id;
  mass2 = auth.newInfo(req.body);
  console.log(mass2);
});


app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});