const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
 
const fileModel = require("../models/files.models");

const authMiddleware = require("../middlewares/authe");

// Home page
router.get("/home",authMiddleware,async (req, res) => {
  const userFiles = await fileModel.find({user: req.user.userId}); // saari files jinki user id req.user.user._id hai
  // console.log(userFiles);

  res.render("home",{
    files: userFiles
  }); // home.ejs render hoga with userFiles data
});

// File upload route
router.post("/upload", authMiddleware, upload.single("file"),async (req, res) => {
  const newFile = await fileModel.create({
    path:req.file.path,
    originalName: req.file.originalname,
    user: req.user.userId // authe js req.user me decoded data hoga
  });
  res.json(newFile);
});

// For downloading the uploaded file(Sirf wohi user download kare jisne upload kia tha kyuki middleware se login koi bhi karlega)
router.get("/download/:id", authMiddleware, async (req, res) => {
  const loggedInUserId = req.user.userId;
  const fileId = req.params.id;

  const file = await fileModel.findOne({ _id: fileId, user: loggedInUserId });

  if (!file) {
    return res.status(404).json({
      message: "File not found or unauthorized access",
    });
  }

  // Redirect the user to Cloudinary file path (downloadable link)
  const cloudinaryURL = file.path;

  // Force download using URL parameters (if needed)
  const downloadableURL = `${cloudinaryURL}?fl_attachment=${file.originalName}`;

  res.redirect(downloadableURL);
});



module.exports = router;


// User ne jab login kia tab user id set kardi fir file ko upload kar raha tha 
// token joh create hua usko decode karke user id nikali
// ab wohi user id yahan par use ho rahi hai user: req.user._id