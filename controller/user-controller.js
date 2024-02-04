import User from "../model/user_model.js";


export const SignUp = async (request, response) => {
    let userMatch = await User.findOne({ email: request.body.email })
    if (!userMatch) {
        try {
            const newUser = new User({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                password: request.body.password,
            })
            await newUser.save()
            response.status(200).json({ msg: 'User Sign Up Successfully' })
        } catch (error) {
            response.status(500).json(error)
        }
    }
    else {
        return response.status(400).json({ msg: "User email already Exist" })
    }
}
