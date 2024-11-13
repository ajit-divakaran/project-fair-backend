const jwt = require('jsonwebtoken')
const users = require("../model/userModel");


// register


exports.register = async(req,res)=>{
    //logic
    const {username,email,password} = req.body;
    console.log(username,email,password)
    console.log("inside register")
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            // const token = jwt.sign({userId:existingUser._id},"secretkey")
            res.status(406).json('User Already exist')
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                profile:"",
                github:"",
                linkedin:""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.login = async(req,res)=>{
    //logic
    const {email,password} = req.body;
    console.log(email,password)
    console.log("inside login")
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},'secretkey')
            res.status(200).json({existingUser,token})
        }
        else{
         res.status(406).json("Incorrect email id or password")
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editProfileController = async(req,res)=>{
    const userId = req.payload;
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadedImage = req.file?req.file.filename:profile;

    try {
    const existingUser = await users.findByIdAndUpdate({_id:userId},{
        username,
        email,
        password,
        profile:uploadedImage,
        github,
        linkedin
    },{new:true})
    await existingUser.save()
    res.status(200).json(existingUser)
        
    } catch (error) {
        res.status(401).json(error)
    }
}