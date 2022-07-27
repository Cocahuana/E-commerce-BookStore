const axios = require('axios');
require("dotenv").config();
const { MY_SECRET } = process.env;
const { User } = require('../db');
const { Op } = require("sequelize")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const registerUser = async (req, res, next) => {

    const { email, password, username } = req.body; 
    try {
        const alreadyExists = await User.findAll({ where: {email: email}})

        if(alreadyExists.length){
            res.send('Email already registered')
            return
        }
        let hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const newUser = await User.create({ 
            email: email, 
            password: hashedPassword,
            username: username, 
        }) 

        res.send('User created succesfully!') 
    }
        catch(err) {
            next(err)
    }

} 

const userLogin = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        let userCheck = await User.findOne({
            where:{
                [Op.or]: [
                    { username: username },
                    { email: username },
                ],
            }
        })
        if(!userCheck.username) return res.send("Email or password does not match!")
        if(userCheck.password !== password) return res.send("Email or password does not match!")

        const jwtToken = jwt.sign({ //token creation 
            id: userCheck.id,
            email: userCheck.email,
            status: userCheck.status
        }, MY_SECRET,  { expiresIn: '12h' })
        res.json({ messsage: `Welcome back ${username}!`, token: jwtToken})
    }catch(e){
        next(e);
    }
}

module.exports = { registerUser, userLogin }