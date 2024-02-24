import User from "../model/user_model.js";



export const getUser = async (request, response) => {
    try {
        const getUser = await User.findById(request.params.id)
        response.status(200).json({ message: 'Signle User Data', data: getUser })
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: error })
    }
};


export const getUsers = async (request, response) => {
    try {
        const allUsers = await User.find({});
        return response.status(200).json({
            msg: 'All Users',
            status: 1,
            data: allUsers
        });
    } catch (error) {

        return response.status(500).json(
            {
                msg: 'Users Request Failed',
                status: 0,
            }
        );
    }
};


export const SignUp = async (request, response) => {
    try {

        const userMatch = await User.findOne({ email: request.body.email });

        if (!userMatch) {
            const { first_name, last_name, email, password } = request.body;
            if (!first_name || !last_name || !email || !password) {
                return response.status(400).json({ msg: 'All fields are required' });
            }

            const newUser = new User({
                first_name,
                last_name,
                email,
                password,
                user_photo: request.file.filename, // Assuming this is the field to store the filename
            });

            // Save the new user to the database
            await newUser.save();

            // Respond with success message
            return response.status(200).json({ msg: 'User signed up successfully' });
        } else {
            return response.status(400).json({ msg: 'User email already exists' });
        }
    } catch (error) {
        // Handle any errors that occur during the sign-up process
        return response.status(500).json({ msg: 'An error occurred', error: error.message });
    }
};


export const login = async (request, response) => {
    const userMatch = await User.findOne({ email: request.body.email })
    if (!userMatch) {
        return response.status(200).json({ msg: 'User Email not found' })
    }
    try {
        if (request.body.password == userMatch.password) {
            return response.status(200).json(
                {
                    status: 1,
                    msg: "User Sign Up Successfully",
                    userData: userMatch
                }
            )
        } else {
            return response.status(200).json({
                status: 0,
                msg: 'Password not matched'
            })
        }
    }
    catch (error) {
        return response.status(500).json({
            status: 0,
            error: "An error occurred while loging up user"
        });
    }
};


