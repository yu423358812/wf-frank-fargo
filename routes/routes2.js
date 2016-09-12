var express = require('express');
var router = express.Router();
var user=require('../dao/user');
var db=require('../dao/userDao');

function checkLogin(req, res, next){
    if(req.session.user){
        res.redirect('/step4');   //If session exists, proceed to page
    } else {
        next();
    }
}
function checkLogin2(req, res, next){
    if(req.session.user){
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/',checkLogin, function(req, res) {
    res.render('index.ejs');
});

router.post('/login', function(req, res) {
    var signEmail=req.body.Email;
    var password=req.body.Password
    db.trueLogin(signEmail,password,function(data){
        console.log(data);
        if(data[0]){
            req.session.user = signEmail;
            res.redirect('/step4');
        }else{
            res.render('index.ejs');
        }
    });
});

router.post('/', function(req, res) {
    var signEmail=req.body.signEmail;
    db.login(signEmail,function(data){
        console.log(data[0]);
        if(data[0]){
            res.render('index.ejs');
        }else{
            var password=req.body.signPassword;
            db.insert(signEmail,password,function(data){
                req.session.user = signEmail;
                res.redirect('/step2');
            });
        }
    });
});
router.get('/step2', function(req, res) {
    if(req.user){
        user.firstName=req.user.name.givenName;
        user.lastName=req.user.name.familyName;
        user.email=req.user.emails[0].value;
        user.industry=req.user._json.industry;
        user.title=req.user._json.positions.values[0].title;
    }
    res.render('step2.ejs',{ user: user });
});
router.post('/step2', function(req, res) {
    res.redirect('/step3');
});
router.get('/step3', function(req, res) {
    if(req.session.user){
        db.queryStep3(req.session.user,function(data){
            console.log(data[0].intSkill);
            user.intSkill=data[0].intSkill;
            user.city=data[0].city;
            user.title=data[0].title;
            res.render('step3.ejs',{user: user});
        });
    }
});
router.post('/step3', function(req, res) {
    res.redirect('/step4');
});
router.get('/step4', function(req, res) {
    res.render('step4.ejs');
});
router.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/index');
});

module.exports = router;
