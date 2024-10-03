import { prisma } from '../prisma/index.js';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header('authorization')?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ success: false, message: "User is not logged in" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.userId
            }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }

        res.user = user;

        next();

    } catch (error) {
        console.error("middlewares :: isLoggedIn :: Something went wrong :: ", error);
        return res.status(400).json({ success: false, message: "Something went wrong" });
    }
}

export { isLoggedIn };