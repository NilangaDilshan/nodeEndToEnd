const { array } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.err("Can not connect to the mongodb: ", error));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Tag length must be more than 0"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    }
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  }
});

const Course = mongoose.model("Course", courseSchema);

async function saveCourse() {
  const course = new Course({
    name: "General JS Module",
    author: "Mosh",
    //tags: ["general"],
    tags: null,
    price: 12,
    isPublished: true,
    category: "web"
  });
  try {
    await course.validate();
    const result = await course.save();
    console.log("Mongo Record Insertion: ", result);
  } catch (ex) {
    console.log("Save Course Error: ", ex);
  }
}

saveCourse();
