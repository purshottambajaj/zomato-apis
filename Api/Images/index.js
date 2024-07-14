import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ImageModel } from "../../database/image/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const image = express.Router();

// Configure Multer for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

/*
Route            /
Description      Uploading given image to local storage, and then saving the file info to MongoDB
Params           None
Access           Public
Method           POST
*/
image.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // Save file information to the database
    const newImage = await ImageModel.create({
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
    });

    return res.status(200).json({ newImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default image;
