var db=require('../dao/userDao');

module.exports = function(app, passport){
    app.get('/', function(req, res){
        console.log("index page");
        res.render('index.ejs');
    });

    // app.get('/profile',isLoggedIn, function(req, res){
    //
    //     res.redirect('step2',{ user: req.user });
    //
    // });

    app.get('/auth/linkedin',
        passport.authenticate('linkedin', { state: 'SOME STATE'  }),
        function(req, res){
            // The request will be redirected to LinkedIn for authentication, so this
            // function will not be called.
        });

    // app.get('/auth/linkedin/callback',checkSignIn, passport.authenticate('linkedin', {
    //     successRedirect: '/step2',
    //     failureRedirect: '/'
    // }));
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', { failureRedirect: '/login' }),
        function(req, res) {
            console.log(req.session.user);
            var userName=req.session.user;
            var firstName=req.user.name.givenName;
            var lastName=req.user.name.familyName;
            var email=req.user.emails[0].value;
            var industry=req.user._json.industry;
            var intSkill=req.user._json.headline;
            var title=req.user._json.positions.values[0].title;
            var city=req.user._json.location.name;
            var country=req.user._json.location.country.code;
            var companyName=req.user._json.positions.values[0].company.name;
            db.update(userName,firstName,lastName,email,industry,intSkill,title,city,country,companyName,function(data){
                res.redirect('/step2');
            });
        });

    // app.get('/logout',isLoggedIn, function(req, res){
    //     req.logout();
    //     res.redirect('/');
    // })

};

// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()){
//         return next();
//     }
//
//     res.redirect('/login');
// }
