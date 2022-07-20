const { boolean } = require("joi");
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
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function saveCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
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

//saveCourse();
getCourses();
