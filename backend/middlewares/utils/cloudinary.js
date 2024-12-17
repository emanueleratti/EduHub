const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "eduhub",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (request, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `${uniqueSuffix}-${file.originalname.split(".")[0]}`;
    },
  },
});

const uploadCloud = multer({ storage: cloudStorage });

module.exports = uploadCloud;
