import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/jwtTokenGenerator.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
   try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) res.status(400).json({error:"Password don't match"});

        const user = await User.findOne({ username });

        if (user) res.status(400).json({error:"Username already exists"});

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

        const profilePic = `https://api.dicebear.com/8.x/personas/svg?seed=${username}`

        const newUser = new User({
           fullName,
           username,
           password: hashedPassword,
           gender,
           profilePicture: profilePic 
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture
            });
        } else {
            res.status(400).json({error:"Invalid user data"});
        }
        
   } catch (error) {
    console.log('Error in signup', error.message);
    res.status(500).json({error:"Server error while trying to signup"});
   }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordValid) {
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture
        });

    } catch (error) {
        console.log('Error in login', error.message);
        res.status(500).json({error:"Server error while trying to login"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log('Error in logout', error.message);
        res.status(500).json({error:"Server error while trying to logout"});
    }
};