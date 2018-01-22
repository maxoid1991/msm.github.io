let Info = [
    {
        "login": "shameless91",
        "password" : "max91",
        "email": "shameless.cansol@gmail.com",
        "info" : [
            {"name" : "John", "age" : 21, "city" : "New York"},
            {"name": "Ted", "age":32, "city": "California"}
        ]
    },
    {
        "login": "shameless92",
        "password" : "max92",
        "email": "shameless.cansol@gmail.com",
        "info" : [
            {"name" : "John_new", "age" : 21, "city" : "New York"},
            {"name": "Ted_new", "age":32, "city": "California"}
        ]
    },
];


let Auth = (data) => {

    
    //Check email and password;

    let ArrLen = Info.length;
    let mass = [];

    for (var i = 0; i < ArrLen; i++) {
        if (data[1] === Info[i].password && data[0] === Info[i].login || data[0] === Info[i].email) {
                mass.push(Info[i].info);
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



module.exports.Info = Info;
module.exports.Auth = Auth;

