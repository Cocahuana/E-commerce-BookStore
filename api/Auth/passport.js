const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt; 
const StrategyJwt = passportJwt.Strategy; 
const { User } = require('../db');
require('dotenv').config()
const { MY_SECRET } = process.env; 

//sirve para autenticar endpoints
//el payload del jwt va a ser el user id

passport.use(
    new StrategyJwt(
        {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.MY_SECRET,
        },
        authUser = async (jwtPayload, done) => {
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

