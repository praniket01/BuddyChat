import user from "../models/User.js";
import jwt from "jsonwebtoken";
import {createUser} from "../lib/stream.js"

export async function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    try {
        if (!email || !password || !fullname) {
            return res.status(400).send({ message: "all fields are necessary" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be atleast 6 characters" });

        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });

        }

        const emailexist = await user.findOne({ email });
        if (emailexist)
            return res.status(400).json({ message: "Email already used. Please use different email" });

        const randomindex = Math.floor(Math.random() * 150) + 1;
        const profilePic = `https://multiavatar.com/Neurostatic/${randomindex}.png`;

        const newUser = await user.create({
            email,
            fullname,
            password,
            profilepic: profilePic
        })

        await createUser({
            id : newUser._id.toString(),
            profilepic : newUser.profilepic || "",
            name : newUser.fullname
        })

        const jwtToken = jwt.sign({ userId: newUser._id }, process.env.jwt_secret, { expiresIn: "5d" })

        res.cookie("jwt", jwtToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error" })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Enter all fields" });

        }
        const fetchUser = await user.findOne({ email });

        if (!fetchUser) {
            res.status(404).json({ message: "User Not Found" });

        }

        const jwtToken = jwt.sign({ userId: fetchUser._id }, process.env.jwt_secret, {
            expiresIn: "5d"
        })

        res.cookie("jwt", jwtToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(200).json({success:true, user : fetchUser});

    } catch (error) {
        console.log(error);
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({success:true,message:"Logout successfull"});

}

export async function onboard(req,res){
    try {
        const userId = req.user._id;
        const {fullname,nativelanguage,bio,learninglanguage,location} = req.body;
        if(!fullname || !nativelanguage || !bio || !learninglanguage || !location){
            return res.status(400).json({message : "all fields required",
                missingFields : [
                    !fullname && "fullname",
                    !nativelanguage && "nativelanguage",
                    !bio && "bio",
                    !learninglanguage && "learninglanguage",
                    !location && "location",

                ].filter(Boolean),
            })

        }
        const updatedUser = await user.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded:true
        },{new:true});
        
        if(!updatedUser){
            return res.status(404).json({message : "User not updated"});
        }

       try {
         await createUser({
            id:updatedUser._id,
            name : updatedUser.fullname,
            image : updatedUser.profilepic
        })
        console.log("Stream user updated")
       } catch (error) {
        console.log("Stream error",error)
       }
        res.status(200).json({success:true,message:"User Onboarded"});

    } catch (error) {
        console.log("Onboarding error",error);
    }
}

 