var mysql=require('mysql');

var dbConf=require('../config/dbConf');

// var connection=mysql.createConnection(dbConf);
// connection.connect();

module.exports = {
    query:function(callback) {
        var connection=mysql.createConnection(dbConf);
        connection.connect();
        connection.query('SELECT * from users', function(err,result) {
            if (err){
                console.log('Error while performing Query.');}
            else{
                callback(result);
            }
            connection.end();
        });
    },
    queryStep3:function(user,callback) {
        var connection=mysql.createConnection(dbConf);
        connection.connect();
        connection.query('SELECT intSkill,title,city from users where userName=?',[user], function(err,result) {
            if (err){
                console.log('Error while performing Query.');}
            else{
                callback(result);
            }
            connection.end();
        });
    },
    trueLogin:function(user,password,callback) {
        var connection=mysql.createConnection(dbConf);
        connection.connect();
        connection.query('select userName,password from users where userName=?  and password=?',[user,password], function(err,result) {
            if (err){
                console.log('Error while performing Query.'); }
            else{
                callback(result);
            }
            connection.end();
        });
    },
    login:function(user,callback) {
        var connection=mysql.createConnection(dbConf);
        connection.connect();
        connection.query('select userName,password from users where userName=?',[user], function(err,result) {
            if (err){
                console.log('Error while performing Query.'); }
            else{
                callback(result);
            }
            connection.end();
        });
    },
    insert:function(user,password,callback) {
        var connection=mysql.createConnection(dbConf);
        connection.connect();
        connection.query('insert into users(userName,password) values(?,?)',[user,password],function(err,result) {
            if (err){
                console.log('Error while performing Query.');}
            else{
                callback(result);
            }
            connection.end();
        });
    },
    update:function(user,firstName,lastName,email,industry,intSkill,title,city,country,companyName,callback) {
        var connection=mysql.createConnection(dbConf);
        connection.connect();
        connection.query('UPDATE users SET firstName=?,lastName=?,email=?,industry=?,intSkill=?,title=?,city=?,country=?,companyName=? where userName=?',[firstName,lastName,email,industry,intSkill,title,city,country,companyName,user],function(err,result) {
            if (err){
                console.log('Error while performing Query.');}
            else{
                callback(result);
            }
            connection.end();
        });
    }
};
