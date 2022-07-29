const axios = require('axios');
const db = require('../db');
const { User, Books } = require('../db');

const banUser = async (req, res, next) => {
    let { userId } = req.body;
    try{
        let userToBan = await User.findOne({
            where:{
                id: userId,
            }
        })
        if(userToBan){
            await userToBan.update({
                status: "Banned",
            })
            res.status(200).send(`User ${userToBan.username} has been banned!`)
        } else{
            res.status(400).send("No user was found with that id")
        }

    }catch(e){
        next(e);
    }
};

const upgradeToAdmin = async (req, res, next) => {
    let { userId } = req.body;
    try{
        let userToAdmin = await User.findOne({
            where:{
                id: userId,
            }
        })
        if(userToAdmin){
            await userToBan.update({
                status: "Admin",
            })
            res.status(200).send(`User ${userToAdmin.username} has been upgraded to admin!`)
        } else{
            res.status(400).send("No user was found with that id")
        }
    }catch(e){
        next(e);
    }
};

const hideBook = async (req, res, next) =>{
    let { bookId } = req.body;
    try{
        let bookToHide = await Books.findOne({
            where:{
                id: bookId,
            }
        })
        if(bookToHide){
            await bookToHide.update({
                stock: 0,
            })
            res.status(200).send(`${bookToHide.title} has been hidden!`)
        } else{
            res.status(400).send("No book was found with that id")
        }
    }catch(e){
        next(e);
    }
};

module.exports = { banUser, upgradeToAdmin, hideBook };