var db = require('./db');
var ObjectID = require('mongodb').ObjectID;

let Info = [
    {
        "login": "shameless91",
        "password" : "max91",
        "email": "shameless.cansol@gmail.com",
        "id" : 1,
        "info" : [
            {"name" : "John", "age" : 21, "city" : "New York"},
            {"name": "Ted", "age":32, "city": "California"}
        ]
    },
    {
        "login": "shameless92",
        "password" : "max92",
        "email": "shameless.cansol@gmail.com",
        "id" : 2,
        "info" : [
            {"name" : "John_new", "age" : 21, "city" : "New York"},
            {"name": "Ted_new", "age":32, "city": "California"}
        ]
    },
];

//LogIn function
let Auth = (data) => {

    
    //Check email and password;

    let ArrLen = Info.length;
    let mass = [];

    for (var i = 0; i < ArrLen; i++) {
        if (data[1] === Info[i].password && data[0] === Info[i].login || data[0] === Info[i].email) {
                mass.push(Info[i]);
                break;
        } else {
            continue;
        }
    } 

    if (mass.length > 0) {
        return mass
    } else {
        return "Вы не прошли аутентификацию, попробуйте еще раз!"
    }
}

//Registration function

let Reg = (data) => {
    let newUser = {
        "login": data[0],
        "password" : data[2],
        "email": data[1],
        "id" : Info.length + 1,
        "info" : []
    }

    Info.push(newUser);

    return true;
}

//Add new data !!!!! Не возвращает через return значения

let newInfo = (data) => {



    db.get().collection("UsersInfo").find().toArray(function(err,docs){


       for (var i = 0; i < docs.length; i++) {

            if (data[0].login === docs[i].login) {

                // Update database
                db.get().collection("UsersInfo").updateOne(
                    {_id: ObjectID(docs[i]._id)},
                    {$set: {info: data[0].info}},
                    function(err, result){console.log("База обновлена!")}
                )
                console.log("Дата: " + docs.id);
                break;

            } else {
                console.log("Не работает!");
                continue;

            }

        }


    });











    //for (var i = 0; i < Info.length; i++) {
        //if(data[0].login === Info[i].login || data[0].login === Info[i].password) {
            //Info[i].info = [];
            //Info[i].info = data[0].info;

            //return Info[i];
            //break;
        //} else {
           //continue;
        //}

    //}
}



module.exports.Info = Info;
module.exports.Auth = Auth;
module.exports.Reg = Reg;
module.exports.newInfo = newInfo;

