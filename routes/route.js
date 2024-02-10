import express from "express";
import { SignUp, getUsers } from "../controller/user-controller.js";
import { CreateBlog, getblogs } from "../controller/blog-controller.js"

const router = express.Router();

// normal
router.get('/', (req, res) => {
    res.send("App Config Succefully")
})


// user authentication routes
router.post('/create_user', SignUp)
router.get('/get_all_user', getUsers)



// all blogs

router.post('/add_update_post', CreateBlog)
router.get('/get_all_blogs', getblogs)


export default router