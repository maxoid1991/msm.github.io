var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require('./auth');

var db = require('./db');

app.use(bodyParser.json());

let mass2 = [];
let id = 0;

app.get('/', function (req, res) {

  if(id === 0) {

    db.get().collection("List").find().toArray(function (err, docs) {
      res.send(docs);
    });

  } else {
    res.send(mass2);
  }
});


//Logout function;

app.post('/auth_logout', function(req, res){
  id = req.body[0];
  res.send(true);
});


//Authorization test data
app.post('/auth_login', function (req, res) {

  let backData = auth.Auth(req.body);

  backData.then(function(result){

    if(result.info) {

    let mass = [];
    mass.push(result.info, result.login);
    res.send(mass);
    id = result.id;
    mass2 = [];
    mass2.push(result.id, result.info, result.login);

    } else {
      res.send(result);
    }
  })
});


//Registration
app.post('/registration', function(req, res){
  res.send(auth.Reg(req.body));
})


//Save Updated data 

app.post('/save', function (req, res) {
  let change = auth.newInfo(req.body);
  mass2 = [id];
  mass2.push(req.body[0].info, req.body[0].login);
});


db.connect("mongodb://localhost:27017/newBase", function(err){
  if (err) {
    console.log(err);
  }

  //Start server after databese success connection

  app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
  });
});