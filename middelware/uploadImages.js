import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Create an Express router
const router = express.Router();

// Serve static files from the public directory
router.use(express.static('public'));

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);

// Multer configuration for file upload
const imageUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
            const imageName = Date.now() + '-blog_image' + '-' + file.originalname;
            cb(null, imageName);
        } else {
            cb(new Error('Invalid file type'), null);
        }
    },
});

// Initialize multer with the configured storage
const upload = multer({ storage: imageUpload });
export default upload;
