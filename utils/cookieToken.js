import getJwtToken from "../helpers/getJwtToken.js";

export default function cookieToken(user, res) {
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true
    }
    user.password = undefined;
    res
        .cookie('token', token, options)
        .json({ success: true, token, user })
}