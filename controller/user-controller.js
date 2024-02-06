import User from "../model/user_model.js";

export const SignUp = async (request, response) => {
    try {
        if (!request.body) {
            return response.status(400).json({ error: "Request body is missing or empty" });
        }
        const { first_name, last_name, email, password } = request.body;

        if (!first_name || !last_name || !email || !password) {
            return response.status(400).json({ error: "Missing required fields in the request body" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return response.status(400).json({ msg: "User email already exists" });
        }
        const newUser = new User({
            first_name,
            last_name,
            email,
            password
        });
        await newUser.save();

        // Return success message
        return response.status(200).json({ msg: 'User signed up successfully' });
    } catch (error) {
        // Log and handle errors
        console.error("Error signing up user:", error);
        return response.status(500).json({ error: "An error occurred while signing up user" });
    }
};
