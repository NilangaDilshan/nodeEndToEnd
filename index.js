const mideleware = require("./middleware");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const Joi = require("joi");
const express = require("express");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db"); // For all wild car-> export DEBUG=app:* , export DEBUG=app:startup, export DEBUG=app:db, For no debug log export DEBUG=
const app = express();

const courses = require("./routes/courses");
app.use("/api/courses", courses);
const home = require("./routes/home");
app.use("/", home);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(express.static("public"));
app.use(mideleware); //Local library for middleware example

app.set("view engine", "pug"); //Templating engine configuration
app.set("views", "./views");

startupDebugger("This is startup debugger log");
dbDebugger("This is DB Debugger log");
/* app.use((req, res, next) => {
  console.log("Authenticating");
  next();
}); */

console.log("Application Name: " + config.get("name"));
console.log("Application Name: " + config.get("mail.host"));
console.log("Application Name: " + config.get("mail.password"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}
/* console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`); */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening On Port ${port}`));
