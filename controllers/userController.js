const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registration = async (req, res) => {
    // Checking if email exists
    const isUser = await User.findOne({email : req.body.email});
    if(isUser) return res.status(404).json({loginErr: "Email already exists"})

    // Hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating new User instance
    const user = new User;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = hashedPassword;

    try {   
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json(error)
    }
    
}

const login = async (req, res) => {
     // Checking if email exists
     const user = await User.findOne({email : req.body.email});
     if(! user) return res.status(404).json({loginErr: "User not found"})

     // Verifing the provided password
     const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
     if(! isPasswordValid) return res.status(404).json({loginErr: "Incorrect Password"})

     //Asynchronously creating a token that'll last for 1Hr
     await jwt.sign({user}, process.env.SECRET, { expiresIn : 60 }, (err, token) => {
        if(err) return res.status(404).json(err)

        // Storing the token to the response header
        res.header('Authorization', token);

        // Sending Json Response
        res.status(200).json({
            email: user.email,
            token: token
        })
     });

}

module.exports.registration = registration;
module.exports.login = login;