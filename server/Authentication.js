'use strict';

var dbManager = require('./DBManager.js');
var crypto = require('crypto');

module.exports.authenticateUser = function(username, password, callback){
    let authenticated = false;
    dbManager.findUser(username, function(user){
      if(user != null){
        console.log(user.salt);
        let  passwordData = sha512(password, user.salt);
            if(passwordData.passwordHash == user.hash){
                console.log("user authenticated");
                authenticated = true;
                return callback(authenticated);
            }

      }
      
       return callback(authenticated); 

    });

}

module.exports.authenticateWithToken = function(username, token, callback){
    dbManager.findUser(username, function(user){
        let status = false;
        if(user.token == token && user.username == username){
            status = true;
            return callback(status);
        }
        return callback(status);

    });
}


module.exports.isUsernameTaken = function(username, callback){
    let taken = false;
    dbManager.findUsers(function(users){
        for( var i=0; i < users.length; i++){
            if (username == users[i].username){
                taken = true;
                return callback(taken);
            }

        }
        return callback(taken);
      });


}

module.exports.generateToken = function(){
    return genRandomString(25);
}


var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);  
};


var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); 
    var passwordData = sha512(userpassword, salt);
    return passwordData;
}


module.exports.encryptPassword = function(password){
    return saltHashPassword(password);
}
