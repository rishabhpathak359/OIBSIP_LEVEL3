const bcrypt = require('bcrypt');
const User = require("../models/user");

const test = (req, res) => {
    res.json("Working fine");
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                err: "Name is required"
            });
        }
        if(!email){
            return res.json({
                err:"Email is required"
            })
        }
        if (!password || password.length < 6) {
            return res.json({
                err: "Password is required and it should be at least 6 characters long"
            });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                err: "Email is already taken"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                err: "User doesn't exist"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({
                err: "Invalid Password"
            });
        }
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
};


module.exports = {
    test,
    registerUser,
    loginUser
};
