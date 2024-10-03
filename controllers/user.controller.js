import bcrypt from 'bcrypt';
import { prisma } from '../prisma/index.js';
import cookieToken from '../utils/cookieToken.js';

const register = async (req, res) => {
    try {
        const {name, email, password}  = req.body;

        //Check
        if([name, email, password].some(field => !field || field === "")){
            throw new Error("Please provide all the fields");
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10)
            }
        })

        //Send user a token
        cookieToken(user);

        return res.status

        
    } catch (error) {
        console.error("controllers :: user.controller.js :: register :: Something went wrong: ", error);
        // return res.status(500).json({success: false, message: "Something went wrong"})
        throw new Error(error);
    }
}

export { register };