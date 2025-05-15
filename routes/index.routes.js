const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");

// Home page
router.get("/home", (req, res) => {
  res.render("home"); // home.ejs render hoga
});

// File upload route
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    console.error(err);
    res.status(400).send("Upload failed");
  }
});

module.exports = router;
