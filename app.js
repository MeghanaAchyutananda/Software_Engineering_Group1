require("dotenv").config();

const db = require('./config/database');

const ejs = require("ejs");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const resturantSetup = require("./seed/resturant.seeder"); // remove this once we have resturants in databse
const client = require("twilio")(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);

PORT = 3000;

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 20}
}));


app.use(passport.initialize());
app.use(passport.session());

/**
* configuration for flash.
*/
app.use(flash());



//Route for Home Page
app.get('/', (req,res)=> {
    res.render("firstpage");
 })

//config for user route
const users = require('./routes/user.routes');
app.use('/user', users);

//config for resturant route
const resturants = require('./routes/resturant.routes');
app.use('/resturants', resturants);

//config for profile route
const profile = require('./routes/profile.route');
app.use('/profile', profile);

//config for about route
const about = require('./routes/about.route');
app.use('/about', about);

//config for contact page
const contact = require('./routes/contact.route');
app.use('/contact', contact);

//config for Rest One page
const restOne = require('./routes/restaurants1.route');
app.use('/RutgersECEFastFood', restOne);

//config for Rest One Checkout
const resOneCheckout = require('./routes/resOneCheckout.route');
app.use('/checkout', resOneCheckout);

//config for Rest Two page
const restTwo = require('./routes/restaurants2.route');
app.use('/ChineseCuisine', restTwo);

//config for Rest Two Checkout
const resTwoCheckout = require('./routes/resTwoCheckout.route');
app.use('/ChineseCuisine/Checkout', resTwoCheckout);



//config for Rest Three page
const restThree = require('./routes/restaurants3.route');
app.use('/JapaneseCuisine', restThree);




//config for Rest Three page
const restFour = require('./routes/restaurants4.route');
app.use('/GermanCuisine', restFour);



//config for Contact Success Page
const contactSuccess = require('./routes/contactSuccess.route');
app.use('/contact/Success', contactSuccess);


app.get("/logout", function(req, res){
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
})

//config home page for
app.get("/home",function(req,res){
    if (req.isAuthenticated()){
      res.render('home');
    }else{
     res.redirect('/user/login');
    }
});




app.get("/success",function(req,res){

    res.render('success');
    // This store Users ECE Fast Food to dataBases.
    /*const order = new Order({
       classicFires : val0,
       JuicyBurger  : val1,
       ChessyPizza  : val2,
       FriedChicken : val3,
       LeafySalad   : val4,
       SoftDrinks   : val5
    });
    order.save(function (err) {
    if (err) return handleError(err);
    // saved!
    or Can USE order.save()
  });*/
});

app.post("/checkout",function(req,res){
    var name = req.body.firstname;
    var address = req.body.address;

  /*client.messages
    .create({
       body: 'Thank You'+" "+name+" "+"For choosing ECE GrubHub. Your Order Will be delieved to"+" "+ address+" " +"in 20 to 30 Minutes",
       from: '+13464886958',
       to: '+1'
  });*/

    res.redirect("success");
});

/**
* The 404 route page
*/
app.get('*', function(req, res){
    res.status(404).redirect('/');
});

/**
* listen to port
*/
app.listen(PORT, ()=> {
    console.log('this application is wokring on port ' + PORT)
})
