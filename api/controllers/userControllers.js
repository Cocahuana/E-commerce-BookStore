const axios = require('axios');
const { User } = require('../db');

const registerUser = async (req, res, next) => {

    const { email, password, username } = req.body; 
    try {
        const alreadyExists = await User.findAll({ where: {email: email}})

        if(alreadyExists.length){
            res.send('Email already registered')
            return
        }

        const newUser = await User.create({ 
            email: email, 
            password: password, 
            username: username, 
        }) 

        console.log(JSON.stringify(newUser))
        res.send('User created succesfully!') 
    }
        catch(err) {
            next(err)
    }

} 

module.exports = { registerUser }