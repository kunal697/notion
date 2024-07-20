const User = require('../models/UserSchema');
const  {jwtAuthMiddleware, generateToken}= require('../config/auth');

const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = new User({ username, email, password });
        await user.save();
        const payload = {
            username : username,
            password : password
        }
        const token = generateToken(payload);
        console.log("token is : ",token);
        res.status(201).json({
            message: 'Account Created',
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username });

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const payload = {
            username : username,
            password : password
        }
        const token = generateToken(payload);
        console.log("token is : ",token);
        res.status(200).json({
          token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const AllUser = async (req,res) =>{
    try{
        const users = await User.find(); 
        res.status(200).json(users);
    }catch(err){
        console.log(err);
    }
}

module.exports = { Register ,AllUser,Login};
