import express from "express";
import { SignUp } from "../controller/user-controller.js";

const router = express.Router();

// normal
router.get('/', (req, res) => {
    res.send("App Config Succefully")
})


// user authentication routes
router.post('/create_user', SignUp)


export default router