// // multer
import fs from "fs";
import multer from "multer";
const uploadsDir = "./uploads/";
const imagesDir = `${uploadsDir}images`;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    // Make uploads directory if it does not exist
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);
    // Determine where to store the file based on its type
    if (file.fieldname === "photo") {
      cb(null, imagesDir);
    }

  },
  filename: function (req, file, cb) {
    var fileExtension = file.mimetype.split("/")[1];
    cb(null, +Date.now() + "." + fileExtension);
  },
});
const upload = multer({ storage });
export const imageUpload = upload.fields([{ name: "photo", maxCount: 1 }]);
