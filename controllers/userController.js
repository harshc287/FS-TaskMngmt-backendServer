const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//register
exports.registerUser = async(req, res) =>{
    try {
        const {name, email, password, role} = req.body;

        const userExits = await User.findOne({where:{email}});
        if(userExits) return res.status(400).json({msg:"email already exits"})

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, 
            email, 
            password:hashedPassword,
            role:role || "user"
            
        });
        res.json({ msg: "User created successfully", user: newUser });

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

//LOGIN

exports.loginUser = async(req, res )=>{
    try {
        const{email, password} = req.body

        const user = await User.findOne({where:{email}})
        if(!user) return res.status(400).json({msg: "user not found"})

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({msg: "incorrect Psaaword"}) 

            const payload = {
                id: user.id,
                role: user.role
            }
            
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: "1d",
        });
 
        res.json({msg: "Login successful",token})
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// GET ALL USERS (admin only)
exports.getUsers = async(req, res) =>{
    try {
        const users = await User.findAll({attributes: {exclude:["password"]}})
        res.json(users)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}