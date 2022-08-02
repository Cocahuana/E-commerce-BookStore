const db = require('../db');
const {User, Books, Cart, Cart_Books} = require("../db");
const nodemailer = require("nodemailer");
const {transporter} = require("../transporter/transporter");

const orderConfirmation = async (req, res, next) => {
    let {cartId, userId} = req.body;
    try{
        let user = await User.findOne({
            attributes: ["email"],
            where:{
                id: userId,
            }
        });

        if (!user.id) return res.status(400).send('User not found');

        let order = await Cart.findOne({
            where:{
                id: cartId,
                UserId: userId,
            },
            include: {
                model: Books,
                attributes: ["id", "title", "price"],
                through: {attributes: ["amount"]}
            },
            
        });

        let booksBought = order.Books.map(book => book.title).join("<br>")
        let totalPrice = order.Books.map(book => book.price).reduce(
            (previousValue, currentValue) => previousValue + currentValue);

        await transporter.sendMail({
            from: '"Bookovich" <ritual.makeup.commerce@gmail.com>',
            to: user.email,
            subject: `Order number ${order.id} Confirmation`,
            html: `<p>Receipt of purchase, Order n° ${order.id}.<br>
            <b>Price:</b> US$${Math.round(totalPrice)}<br>
            <b>Books:</b><br>${booksBought}
            <br>This mail was sent by a bot, do not respond! Thank you!</p>`
        }, (err, info) => {
            if (err) {
              res.status(400).send(err.message);
            } else {
              res.status(200).json(info);
            }})
    }catch(e){
        next(e)
    }
};

const userCreated = async (req, res, next) => {
    let { userId } = req.body;
    try{
        let user = await User.findOne({
            where:{
                id: userId,
            }
        })

        if (!user.id) return res.status(400).send('User not found');

        await transporter.sendMail({
            from: '"Bookovich"<ritual.makeup.commerce@gmail.com>',
            to: user.email,
            subject: `Thank you ${user.username}! For signing up to Bookovich E-Commerce`,
            html:`<h4><b>Welcome!</b></h4>
            <p>User ${user.username} has been created successfully.
            <br>To verify your account click the following link: <a href="https://e-commerce-book-store.vercel.app/">Bookovich</a>
            <br>Or copy & paste this URL in your browser: https://e-commerce-book-store.vercel.app/`
            // Explore new deals and our extensive catalogue of books at <a href="https://e-commerce-book-store.vercel.app/">Bookovich</a>!</p>`
          }, (err, info) => {
            if (err) {
              res.status(400).send(err.message);
            } else {
              res.status(200).json(info);
            }});
    }catch(e){
        next(e);
    }
};


module.exports = { orderConfirmation, userCreated }