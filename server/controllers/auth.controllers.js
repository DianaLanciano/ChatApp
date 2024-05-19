import User from "../models/user.model.js";
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
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePicture: newUser.profilePicture
        });
   } catch (error) {
    console.log('Error in signup', error.message);
    //res.send(500).json({error:"Server error while trying to signup"});
   }
};

export const login = (req, res) => {
    console.log('login');
};

export const logout = (req, res) => {
    console.log('logout');
};