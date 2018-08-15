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
let sess;


app.post('/', function (req, res) {

  if (req.body[0] === null || req.body[0] === "5acfc3e7734d1d55c31b54dd") {
    db.get().collection("List").find().toArray(function (err, docs) {
      res.send(docs);
    });    
  } else {
    //console.log("Пришло " + req.body[0]);
    let Data = db.get().collection("UsersInfo").find().toArray();
    Data.then(function(docs){
      for(var i = 0; i < docs.length; i++) {
        if (req.body[0] == docs[i]._id) {
          res.send(docs[i])
          break;
        } else {
          console.log("Не равны!");
        }
      }
    })
    //Взять UID найти его в BD и отдать данные БД
    //А снизу говно удалить
    //res.send(mass2);
  }



  // if(!sess) {
  //   db.get().collection("List").find().toArray(function (err, docs) {
  //     res.send(docs);
  //   });  
  // }  else {
  //   res.send(mass2);
  // }

  

  // if(id === 0) {

  // //   db.get().collection("List").find().toArray(function (err, docs) {
  // //     res.send(docs);
  // //   });

  // } else {
  //   res.send(mass2);
  // }
});


//Logout function;

app.post('/auth_logout', function(req, res){
  //id = req.body[0];
  req.session.destroy();
  res.send(true);
});


//Authorization test data
app.post('/auth_login', function (req, res) {


  let backData = auth.Auth(req.body);

  backData.then(function(result){

    if(result.info) {

    res.send(result);

    // Обновление страницы

    //id = result.id;
    //console.log("Сессия: " + sess.login, result.login);


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
  res.send("Cохранено!");
});


db.connect("mongodb://Maxless1991:Linkinpark1991@ds055895.mlab.com:55895/newbase", function(err){
  if (err) {
    console.log(err);
  }

  //Start server after databese success connection

  app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
  });
});

//process.env.PORT || 