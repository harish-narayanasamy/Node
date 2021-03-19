const debug = require("debug")("app:startup");
//const dbDebugger = require("debug")("app:db");
const config = require("config")
const express = require("express");
const logger = require("./middleware/logger")
const app = express();
const Joi = require("joi");
const helmet = require("helmet")
const morgan = require("morgan")
const courses = require('./routes/courses')
const home = require('./routes/home')


app.set('view engine', 'pug')
app.set('views', './views')//default
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(helmet());
app.use("/api/courses", courses);
app.use('/', home)



if (app.get("env") === "development") {
    app.use(morgan("tiny"))
    debug("morgan enabled")

}
//Db work
//dbDebugger("db enabled")

//console.log(`Environment:${process.env.NODE_ENV}`)
//console.log(`App:${app.get("env")}`)
console.log("Application name" + config.get("name"))
console.log("Mail Server name" + config.get("mail-server"))
console.log("Mail password" + config.get("mail.password"))


app.use(logger);
app.use(function (req, res, next) {

    console.log("Authenticating")
    next();

})

app.get("/", (req, res) => {

    res.render('index', { title: "App", message: "Hello" })
    // res.status(200).send("Node Server running !!!");
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`))

module.exports = app;