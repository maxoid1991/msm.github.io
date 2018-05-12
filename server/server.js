var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var auth = require('./auth');

var db = require('./db');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

    res.send(result);

    // Обновление страницы

    id = result.id;
    mass2.push(result);

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
  id = 2;
  mass2 = [req.body[0], id];
});


db.connect("mongodb://Maxless1991:Linkinpark1991@ds055895.mlab.com:55895/newbase", function(err){
  if (err) {
    console.log(err);
  }

  //Start server after databese success connection

  app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening on port 5000!');
  });
});