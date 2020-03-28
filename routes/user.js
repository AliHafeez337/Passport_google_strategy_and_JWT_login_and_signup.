
const express = require('express');
const passport = require('passport');
const router = express.Router();

var {User} = require("../models/user");

router.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
    ]})
);


// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/fail"
//   })
// );

router.get(
    '/auth/google/callback',
    passport.authenticate("google", 
    { failureRedirect: '/user/fail' }),
    async function(req, res) {
        console.log(req.user._json.email);
        if(req.user._json.email_verified){
            const doc = await User.findByEmail(req.user._json.email);
            // console.log(doc);
            if (doc == null){
                var user = new User({
                    'email': req.user._json.email
                });
                // console.log(user);
                
                var doc1 = await user.save();
                res.status(200).send(doc1);
            }
            else{
                console.log(doc);
                // generate token...
                // res.send the token to the user for their local storage
                // if you get the token on a request, match the token
                // if it matches, then the user is already login
            }
        }
        else{
            res.status(401).send({
                'errmsg': "Email is not verified on google..."
            });
        }
    }
);

router.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

module.exports = router;