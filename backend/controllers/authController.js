import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { username, fullname, email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const isExistingUser = await User.findOne({username});
        if(isExistingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const isExistingEmail = await User.findOne({email});
        if(isExistingEmail){
            return res.status(400).json({ message: "email already exists"});
        }

        if(password.length < 5){
            return res.status(400).json({
                message: "password must be 5min length"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            username,
            password: hashedPass
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                fullname: newUser.fullname,
                email: newUser.email,
                username: newUser.username,
            })
        }else{
            return res.status(404).json({
                message: "Invalid user data"
            })
        }


    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res){
    try {
        const { username, password} = req.body;

        const user = await User.findOne({username});
        const isPass = await bcrypt.compare(password, user?.password || "" );

        if(!user || !isPass){
            res.status(400).json({
                error: "Invalid username or password"
            });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
        })

    } catch (error) {
        console.log("login error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function logout(req, res){
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({
            message: "logout successful"
        });
    } catch (error) {
        console.log("login error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getMe(req, res){
    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
    }catch(error){
        console.log("getMe error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
