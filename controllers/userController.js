const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register
exports.registerUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;

        const userExits = await User.findOne({where:{email}});
        if(userExits) return res.status(400).json({msg:"email already exits"})

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email, 
            password:hashedPassword,
            
        });
        res.json(newUser);

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
            
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{
            expiresIn: "1d",
        });

        res.json({token})
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

exports.getUsers = async(req, res) =>{
    try {
        const users = await User.findAll({attributes: {exclude:["password"]}})
        res.json(users)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}