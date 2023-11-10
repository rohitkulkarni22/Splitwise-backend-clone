const { signupValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt"); 
const User = require("../models/user");
const JWT = require("jsonwebtoken");


// User Signup
async function handleUserSignup(req, res) {
    const body = req.body;

    // Validating the user data 
    const { error } = signupValidation(body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the email already exists
    const emailExist = await User.findOne({ email: body.email });
    if (emailExist) return res.status(400).send("Email already exists");
    

    // Encrypting the password 
    const salt = await bcrypt.genSalt(10);  // 10 char will be created for the hashing algorithm.
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = new User({
        name: body.name,
        email: body.email,
        password: hashedPassword,
    });

    try { 
        const savedUser = await user.save();
        return res.status(200).send({status: "Profile saved successfully", user: savedUser._id });
    } catch (err) {
        return res.status(400).send({status: "Failed to register user", msg: err });
    }
};


// User Login
async function handleUserLogin(req, res) {
    const body = req.body;

    // Validating the user data 
    const { error } = loginValidation(req.data);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking the user email
    const user = await User.findOne({ email: body.email });
    if (!user) return res.status(400).send("Invalid Email");

    // Checking the password
    // Comparing the encrypted password with the entered one
    const validPass = await bcrypt.compare(body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    // Creating a token for the user login session
    const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header("X-auth-token", token).send(token);
};

module.exports = {
    handleUserSignup,
    handleUserLogin,
};

