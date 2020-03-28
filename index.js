/*  EXPRESS SETUP  */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());

/* PASSPORT FACEBOOK AUTHENTICATION */

require('./passport/google');

/* Routes */

var userRoutes = require('./routes/user');
// var userRoutes = require('./routes/user.router');

app.use("/user", userRoutes);
app.get('/:file', function(req, res){
  var file = req.params.file;
  console.log(req.params.file);
  req.params.file == 'register' ? 
    res.sendFile('register.html', { root : __dirname}) : 
    res.sendFile('login.html', { root : __dirname});
});