import jwt from 'jsonwebtoken';

export default function getJwtToken(userId) {
    return jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: '10 days'})
}

