var db = require('./db');
var ObjectID = require('mongodb').ObjectID;


//LogIn function
let Auth = (data) => {

    //Take all data

    let Data = db.get().collection("UsersInfo").find().toArray();

    //Processing using promise

    return Data.then(function(docs){

        let dataReturn;

        for (var i = 0; i < docs.length; i++) {
            if (data[0] === docs[i].login && data[1] === docs[i].password) {
                dataReturn = docs[i];
                break;
            } else {continue};       
        }

        if(dataReturn === undefined) {
            return "Вы не прошли аутентификацию!"
        } else {
            return dataReturn;
        }
    })

}

//Registration function

let Reg = (data) => {

    db.get().collection("UsersInfo").insertOne({
        login: data[0],
        password: data[2],
        email: data[1],
        id: 1,
        info:[]
    });

    return true;
}

//Add new data

let newInfo = (data) => {

    db.get().collection("UsersInfo").find().toArray(function(err,docs){


       for (var i = 0; i < docs.length; i++) {

            if (data[0].login === docs[i].login) {

                // Update database
                db.get().collection("UsersInfo").updateOne(
                    {_id: ObjectID(docs[i]._id)},
                    {$set: {info: data[0].info}},
                    function(err, result){"База данных обновлена!"}
                )
                break;

            } else {
                continue;
            }
        }
    })
}


module.exports.Auth = Auth;
module.exports.Reg = Reg;
module.exports.newInfo = newInfo;

