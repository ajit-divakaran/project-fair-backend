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