import express from "express";
import { SignUp, getUsers, getUser, login } from "../controller/user-controller.js";
import { CreateBlog, getblogs, getblog } from "../controller/blog-controller.js"
import upload from "../middelware/uploadImages.js";

const router = express.Router();

// normal
router.get('/', (req, res) => {
    res.send("App Config Succefully")
})


// user authentication routes
router.post('/create_user', upload.single('user_photo'), SignUp)
router.post('/login_user', login)
router.get('/get_user/:id', getUser)
router.get('/get_all_user', getUsers)



// all blogs

router.post('/add_update_post', CreateBlog)
router.get('/get_all_blogs', getblogs)
router.get('/get_blog/:id', getblog)


export default router