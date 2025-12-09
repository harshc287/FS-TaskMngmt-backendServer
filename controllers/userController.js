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
            
        const token = jwt.sign(payload, process.env.JWT_SECRET);
 
        res.json({msg: "Login successful",token})
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}


exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id,{
            attributes:{exclude:["password"]}
        })

         res.json(user);

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// USER UPDATE OWN PROFILE
exports.updateUser = async (req, res) => {
    try {
        const { ID } = req.params;

        if (parseInt(ID) !== req.user.id)
            return res.status(403).json({ msg: "Unauthorized action" });

        const { name, email, password } = req.body;

        const user = await User.findByPk(ID);
        if (!user) return res.status(404).json({ msg: "User not found" });

        let hashed = user.password;
        if (password) hashed = await bcrypt.hash(password, 10);

        await user.update({
            name: name || user.name,
            email: email || user.email,
            password: hashed
        });

        res.json({ msg: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// USER DELETE OWN PROFILE
exports.deleteUser = async (req, res) => {
    try {
        const { ID } = req.params;

        if (parseInt(ID) !== req.user.id)
            return res.status(403).json({ msg: "Unauthorized action" });

        const user = await User.findByPk(ID);
        if (!user) return res.status(404).json({ msg: "User not found" });

        await user.destroy();

        res.json({ msg: "Account deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ADMIN: GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ADMIN: GET USER BY ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ADMIN: UPDATE ANY USER
exports.updateUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        let hashed = user.password;
        if (password) hashed = await bcrypt.hash(password, 10);

        await user.update({
            name: name || user.name,
            email: email || user.email,
            password: hashed,
            role: role || user.role
        });

        res.json({ msg: "User updated successfully", user });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// ADMIN: DELETE ANY USER
exports.deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        await user.destroy();

        res.json({ msg: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};