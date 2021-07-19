const User = require("../models/userModel");
const sendToken = require("../utilities/jwtToken");

//register a user

exports.registerUser = async ( req, res, next ) =>{
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        // const token = user.getJwtToken()

        // res.status(201).json({
        //     success: true,
        //     token,
        //     user
        // });
        
        sendToken(user, 200, res);

    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

//login user
exports.loginUser = async(req, res, next) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json("Please enter email or password");
        }
    
        //finding the user in the database
        const user = await User.findOne({email}).select("+password");
    
        if(!user){
            return res.status(401).json("Invalid email or password");
        }
    
        //check if password is correct
        const isPasswordMatched = await user.comparePassword(password);
    
        if(!isPasswordMatched){
            return res.status(401).json("Invalid email or password");
        }
    
        // const token = user.getJwtToken();
    
        // res.status(200).json({
        //     success: true,
        //     token,
        //     user
        // })

        sendToken(user, 200, res);
        

    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

//logout user
exports.logOut =  async( req, res, next) =>{
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged Out"
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}