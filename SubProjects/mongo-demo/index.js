const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.err("Can not connect to the mongodb: ", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  price: Number,
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function saveCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    price: 10,
    isPublished: true
  });
  const result = await course.save();
  console.log("Mongo Record Insertion: ", result);
}

async function getCourses() {
  /*  Find all results */
  //const courses = await Course.find();
  /* Filterout result with query */
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10) //Limit the result to 10 documents
    .sort({ name: 1 }) //Sort by name field. 1 for ascending order, -1 for descending order
    .select({ name: 1, tags: 1 }); //select only name and tag fields of the document
  console.log("All Mongo Courses: ", courses);
}

async function getCoursesWithComparisonQueryOperators() {
  //const courses = await Course.find({ price: { $in: [10, 7] } }) // With leading $ sign we can define the comparison query criteria
  //const courses = await Course.find({ price: { $eq: 8 } })
  //const courses = await Course.find({ price: { $gt: 8 } })
  const courses = await Course.find({ price: { $gt: 7, $lt: 10 } })
    .limit(10) //Limit the result to 10 documents
    .sort({ name: 1 }) //Sort by name field. 1 for ascending order, -1 for descending order
    .select({ name: 1, tags: 1 }); //select only name and tag fields of the document
  console.log("All Mongo Courses: ", courses);
}
//saveCourse();
//getCourses();
getCoursesWithComparisonQueryOperators();
