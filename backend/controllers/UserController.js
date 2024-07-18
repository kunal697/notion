const User = require('../models/UserSchema');

const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            message: 'Account Created',
            success: true
        });
    } catch (err) {
        console.log(err);
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

module.exports = { Register ,AllUser};
