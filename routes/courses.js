const express = require("express");
const router = express.Router();
//const Joi = require("joi");

const courses = [
  { id: 1, name: "couse 1" },
  { id: 2, name: "couse 2" },
];

/* First Get Route
 app.get("/", (req, res) => {
  console.log("Incomming GET Request");
  res.send("Hello World!");
}); */

router.get("/", (req, res) => {
  console.log("Incomming GET for API COURSES");
  //res.send([1, 2, 3]);
  res.send(courses);
});

router.get("/:id/:couse", (req, res) => {
  console.log(`Incomming GET for API COURSES. ID: ${req.query.subject}`);
  //res.send(req.params); req.params.id req.params.couse req.query.subject
  res.send(req.query);
});

router.get("/:id", (req, res) => {
  console.log(`Incomming GET for API COURSES. ID: ${req.query.id}`);
  //let is the variable type for the given scope block
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The couse does not exist");
  res.send(course);
});

router.post("/", (req, res) => {
  console.log(`Incomming POST for API COURSES.`);
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send(`Course ID does not exist: ${req.params.id}`);
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send(`Course ID does not exist: ${req.params.id}`);
  const indexOfCourse = courses.indexOf(course);
  courses.splice(indexOfCourse, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  }).options({ abortEarly: false });
  return schema.validate(course);
}

module.exports = router;
