import getJwtToken from "../helpers/getJwtToken.js";

export default function cookieToken(user, res) {
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expires in 3 days
        httpOnly: true,  // Cookie cannot be accessed via JavaScript (for security)
        secure: true     // Cookie will only be sent over HTTPS
    };
    
    // Prevent exposing the user's password in the response
    user.password = undefined;

    // Set cookie and return response with success status and user data
    res
        .status(200)
        .cookie('token', token, options)
        .json({ success: true, token, user });
}
