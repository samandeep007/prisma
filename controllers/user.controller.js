import bcrypt from 'bcrypt';
import { prisma } from '../prisma/index.js';
import cookieToken from '../utils/cookieToken.js';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if ([name, email, password].some(field => !field || field === "")) {
            return res.status(400).json({ success: false, message: "Please provide all the fields" });
        }

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10)  // Hash password
            }
        });

        // Send user a token and set it in a cookie
        cookieToken(user, res);

        // No need for additional res.json() here, cookieToken sends the response

    } catch (error) {
        console.error("controllers :: user.controller.js :: register :: Something went wrong: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export { register };
