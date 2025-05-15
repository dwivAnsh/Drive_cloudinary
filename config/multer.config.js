const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'drive-ankur-files', // ✅ tum kuch bhi naam rakh sakte ho
    public_id: (req, file) => file.originalname.split('.')[0], // Optional: custom filename
  },
});

const upload = multer({ storage });

module.exports = upload;
