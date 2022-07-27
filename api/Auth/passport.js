const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt; 
const StrategyJwt = passportJwt.Strategy; 
const { User } = require('../db');
require('dotenv').config()
const { MY_SECRET } = process.env; 

//sirve para autenticar endpoints
//el payload del jwt va a ser el user id

passport.use('jwt-auth',
    new StrategyJwt(
        {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.MY_SECRET,
        },
        authenticateUser = async (jwtPayload, done) => {
            try {
                var findUser = await User.findOne({ 
                    where: { id: jwtPayload.id } 
                })
                done(null, findUser);
        
            } catch(err){
                done(err)
            }
        }     
    )
);

passport.use("jwt-admin",
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: MY_SECRET,
    },
        authorizeAdmin = async (jwtPayload, done) => {
            try{
            if(jwtPayload.status === "Admin"){
                let adminCheck = await User.findOne({
                    where:{
                        id: jwtPayload.id,
                        status: "Admin",
                    }
                })
                done(null, adminCheck)
            } else done(null, false, {message: "User is not an admin!"}) 
        }catch(error){
            done(error);
        }
    })
    );
    
passport.use("jwt-banned",
new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: MY_SECRET,
},
    rejectBanned = async (jwtPayload, done) => {
        try{
        if(jwtPayload.status === "Banned"){
            done(null, false, {message: "User is banned, they cannot review!"})
        } else done(null, true)
    }catch(error){
        done(error);
    }
})
);