const express = require("express");
const router = express.Router();

//Template Engine Test Route
router.get("/", (req, res) => {
  console.log("Pug template Result");
  res.render("index", {
    title: "My Express APP",
    message: "Express App Message",
  });
});

module.exports = router;
