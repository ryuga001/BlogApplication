import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const SECRET = process.env.JWT_SECRET;


const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    };
    const token = jwt.sign(payload, SECRET,
        // {
        //     expiresIn: '10h',
        // }
    );
    return token;
}

const validateToken = (token) => {
    const payload = jwt.verify(token, SECRET);
    return payload;
}

export { createTokenForUser, validateToken };

