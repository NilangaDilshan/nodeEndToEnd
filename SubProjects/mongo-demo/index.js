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
  console.log("ComparisonQueryOperators Mongo Courses: ", courses);
}

async function getCoursesWithLogicalOperators() {
  const courses = await Course.find({ price: { $gt: 7, $lt: 10 } })
    .or([{ author: "Mosh" }, { isPublished: true }])
    .and([{ isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log("CoursesWithLogicalOperators Mongo Courses: ", courses);
}

async function getCoursesWithRegularExpressions() {
  const courses = await Course
    //.find({ author: /^Mosh/ }); //Starts with Mosh
    //.find({ author: /Hamedani$/i }) //Ends with Hamedani , Ignore case (i)
    .find({ author: /.*Mosh.*/i }) // Contains Mosh and ignore case
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log("Courses with Mongo Regular Expressions: ", courses);
}

async function getCoursesCountExample() {
  const courses = await Course.find({ author: /.*Mosh.*/i })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log("Courses Count ", courses);
}

async function getCoursesWithPagination() {
  const pageNumber = 1;
  const pageSize = 10;
  const courses = await Course.find({ author: /.*Mosh.*/i })
    .skip((pageNumber - 1) * pageSize) //This is to set the off set. To avoid previous page
    .limit(pageSize) //This is the size of elements per page
    .sort({ name: 1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log("Courses With Pagination ", courses);
}

async function retrieveAndUpdateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  /* Update Approach 1 */
  //course.author = "New Author";
  //course.price = 12;

  /* Update Approach 2 */
  course.set({
    author: "New Author",
    price: 12
  });
  const result = await course.save();
  console.log("Retrieve and Update Restul: ", result);
}

async function directDocumentUpdate(id) {
  /* const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Slayer"
      }
    }
  );
  console.log("Update Direct Docuement Result: ", result); */

  const courseResult = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        price: 30
      }
    },
    { new: true } //If you do not define this property you will get the previous docuement before the update
  );
  console.log(
    "Update Direct Docuement Result(Get Document As Result): ",
    courseResult
  );
}
//saveCourse();
//getCourses();
//getCoursesWithComparisonQueryOperators();
//getCoursesWithLogicalOperators();
//getCoursesWithRegularExpressions();
//getCoursesCountExample();
//getCoursesWithPagination();
//retrieveAndUpdateCourse("62d78969cc254df8e942b99c");
directDocumentUpdate("62d78969cc254df8e942b99c");
