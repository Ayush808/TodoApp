var express = require("express");
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
const connectDB = require('./config/db.js')
var methodOverride = require('method-override')
var routes = require("./routes/routes");
var app = express();
const keys = require('./config/keys')

//Connect to MongoDB
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://chris:1234@ds137256.mlab.com:37256/todoapp", {
//     useMongoClient: true
// }).then(function () {
//     console.log("Todo App Database Has Started!");
// });

//Connect to MongoDB
connectDB();

//Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Set EJS as View Engine
app.set("view engine", "ejs");

//Serve Static Folders
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


//Use method override ---------------- used to  
app.use(methodOverride('_method'));

//Routes
app.use("/", routes);

//Start Server
app.listen(process.env.PORT || keys.port, process.env.IP, function () {
    console.log("Todo App Server Has Started! at PORT: " + 5000);
});