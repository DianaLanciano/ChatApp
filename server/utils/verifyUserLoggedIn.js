import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const verifyUserLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) res.status(500).json({error: "Unauthorized - No Token Provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) res.status(500).json({error: "Unauthorized - Invalid token"});

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) res.status(500).json({error: "Unauthorized - User Not Found"});

        req.user = user;

        next();

    } catch (error) {
        console.log('Error in verifying user', error.message);
        res.status(500).json({error: "Server error while trying verify if current user is logged in"});
    }
};

export default verifyUserLoggedIn;