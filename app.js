var express     =require("express"),
    app         =express(),
    bodyParser  = require('body-parser'),
    flash       = require("connect-flash"),
    passport    =require("passport"),
    localStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    Campground  =require("./models/campground"),
    Comment     =require("./models/comment"),
    User        =require("./models/user"),
    mongoose    =require("mongoose"),
    seedDB      =require("./seeds")

var campgroundRoutes=require("./routes/campgrounds")   
var commentRoutes=require("./routes/comments")   
var indexRoutes=require("./routes/index")   

    
    // mongoose.Promise = global.Promise; 
// mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://sourya:sourya1126@ds141098.mlab.com:41098/dbyelpcamp", {useMongoClient: true});
// mongodb://sourya:sourya1126@ds141098.mlab.com:41098/dbyelpcamp
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine","ejs");
// seedDB(); seed the database
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"))
app.use(flash());
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "cutie pie",
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error= req.flash("error")
    res.locals.success= req.flash("success")
    next();
    
})

app.use(indexRoutes)
app.use(commentRoutes)
app.use(campgroundRoutes)


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("yelpcamp server has started");
    
})