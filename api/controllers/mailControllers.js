const db = require( '../db' );
const { User, Books, Cart, Cart_Books } = require( "../db" );
const nodemailer = require( "nodemailer" );
const { transporter } = require( "../transporter/transporter" );
const { createPdf } = require( "../pdf-lib/bookPdf" )
const { Op } = require( 'sequelize' );

const orderConfirmation = async ( req, res, next ) => {
  let { cartId, userId } = req.body;
  try
  {
    let user = await User.findOne( {
      attributes: ["email"],
      where: {
        id: userId,
      }
    } );
    let pdf = await createPdf()
    if ( !user ) return res.status( 400 ).send( 'User not found' );

    let order = await Cart.findOne( {
      where: {
        id: cartId,
        UserId: userId,
      },
      include: {
        model: Books,
        attributes: ["id", "title", "price"],
        through: { attributes: ["amount"] }
      },

    } );

    let booksBought = order.Books.map( book => book.title ).join( "<br>" )
    let totalPrice = order.Books.map( book => book.price ).reduce(
      ( previousValue, currentValue ) => previousValue + currentValue );

    await transporter.sendMail( {
      from: '"Bookovich" <bookovich.book.store@gmail.com>',
      to: user.email,
      subject: `Order confirmation for your latest purchase!`,
      html: `<p>Receipt of purchase, Order n° ${ order.id }.<br>
            <b>Price:</b> US$${ Math.round( totalPrice ) }<br>
            <b>Books:</b><br>${ booksBought }</p>
            <p>This mail was sent by a bot, do not respond! Thank you!</p>`,
      attachments: [{
        filename: "Books ordered",
        contentType: 'application/pdf',
        content: pdf
      }]
    }, ( err, info ) => {
      if ( err )
      {
        res.status( 400 ).send( err.message );
      } else
      {
        res.status( 200 ).json( info );
      }
    } )
  } catch ( e )
  {
    next( e )
  }
};

const userCreated = async ( req, res, next ) => {
  let { email } = req.body;
  try
  {
    let user = await User.findOne( {
      where: {
        email: email,
      },
    } );

    if ( !user ) return res.status( 400 ).send( 'User not found' );

    await transporter.sendMail(
      {
        from: '"Bookovich"<bookovich.book.store@gmail.com>',
        to: email,
        subject: `Thank you ${ user.username }! For signing up to Bookovich E-Commerce`,
        html: `<h4><b>Welcome!</b></h4>
            <p>User ${ user.username } has been created successfully.
            <br>To enter to your new account click the following link: <a href="https://e-commerce-book-store.vercel.app/login">Bookovich</a>
            <br>Or copy & paste this URL in your browser: https://e-commerce-book-store.vercel.app/login</p>
            <p>This mail was sent by a bot, do not respond! Thank you!</p>`
        // Explore new deals and our extensive catalogue of books at <a href="https://e-commerce-book-store.vercel.app/">Bookovich</a>!</p>`
      }, ( err, info ) => {
        if ( err )
        {
          res.status( 400 ).send( err.message );
        } else
        {
          res.status( 200 ).json( info );
        }
      } );
  } catch ( e )
  {
    next( e );
  }
};

const newsletterUpdate = async ( req, res, next ) => {
  let { email } = req.body;
  try
  {
    let user = await User.findOne( {
      where: {
        email: email,
      },
    } );

    if ( !user ) return res.status( 400 ).send( 'User not found' );

    await transporter.sendMail(
      {
        from: '"Bookovich"<bookovich.book.store@gmail.com>',
        to: user.email,
        subject: `Thank you for subscribing to our Newsletter!`,
        html: `<h4>Welcome to the club!🎉</h4>
            <p>As part of our newsletter subscribers you will get real time offers in our <b>BEST</b> BOOKS📚.
            <br>Explore new deals and our extensive catalogue of books at <a href="https://e-commerce-book-store.vercel.app/books">Bookovich</a>!</p>
            <p>This mail was sent by a bot, do not respond! Thank you!</p>    `
      }, ( err, info ) => {
        if ( err )
        {
          res.status( 400 ).send( err.message );
        } else
        {
          res.status( 200 ).json( info );
        }
      } );
  } catch ( e )
  {
    next( e );
  }
};

const newOffers = async ( req, res, next ) => {
  let arrayPromises = [];
  try
  {
    let users = await User.findAll( {
      attributes: ["email"],
    }, {
      where: {
        subscribed: "Subscribed",
      }
    } );

    if ( users.length === 0 ) return res.send( "No users are subscribed to the newsletter at the moment :(" )


    users.forEach( ( user ) => {
      arrayPromises.push(
        transporter.sendMail(
          {
            from: '"Bookovich"<bookovich.book.store@gmail.com>',
            to: user.email,
            subject: `There are new offers from Bookovich! 🎉🎉`,
            html: `<p>Check out our new offers available at our webpage <a href="https://e-commerce-book-store.vercel.app/">Bookovich</a>!
                <br>Or paste the following URL in your browser: https://e-commerce-book-store.vercel.app/
                <br>Don't miss out on these NEW <b>HOT DEALS</b>🔥🔥🔥!</p>`,
          },
          ( err, info ) => {
            if ( err )
            {
              res.status( 400 ).send( err.message );
            } else
            {
              res.status( 200 ).json( info );
            }
          }
        )
      );
    } );
    await Promise.all( arrayPromises );
  } catch ( err )
  {
    next( err );
  }

};

const specificOffer = async ( req, res, next ) => {
  let { bookId } = req.body;
  let arrayPromises = [];
  try
  {
    let bookObject = await Books.findOne( {
      where: {
        id: bookId,
      },
    } );


    if ( !bookObject.salePrice )
      return res.send(
        `${ bookObject.title } does not have a sale currently`
      );

    let usersToFilter = await User.findAll( {
      where: {
        favorites: {
          [Op.not]: [],
        },
        subscribed: 'Subscribed',
      },
    } );

    let usersToMail = usersToFilter.filter( ( user ) =>
      user.favorites.includes( bookId )
    );

    if ( usersToMail.length === 0 )
      return res.send( 'No users with that book in their favorites' );

    usersToMail.forEach( ( user ) => {
      arrayPromises.push(
        transporter.sendMail(
          {
            from: '"Bookovich"<bookovich.book.store@gmail.com>',
            to: user.email,
            subject: `A book in your favorites is on SALE! 🎉🎉`,
            html: `<p><b>${ bookObject.title }</b> is now on sale! For a LIMITED TIME⏰ you can buy it at US$ ${ bookObject.salePrice }!!
                <br>Check out our that and many other offers available at our webpage <a href="https://e-commerce-book-store.vercel.app/books">Bookovich</a>!
                <br>Or paste the following URL in your browser: https://e-commerce-book-store.vercel.app/books
                <br>Don't miss out on these NEW <b>HOT DEALS</b>🔥🔥🔥!</p>
                <p>This mail was sent by a bot, do not respond! Thank you!</p>`
          }, ( err, info ) => {
            if ( err )
            {
              res.status( 400 ).send( err.message );
            } else
            {
              res.status( 200 ).json( info );
            }
          } )
      )
    } )
    await Promise.all( arrayPromises )
  } catch ( err )
  {
    next( err )
  }
};

const passwordRecovery = async ( req, res, next ) => {
  let { email } = req.body;
  try
  {
    let user = await User.findOne( {
      where: {
        email: email,
      },
    } );
    if ( !user ) return res.status( 400 ).send( 'User not found' );

    await transporter.sendMail(
      {
        from: '"Bookovich"<bookovich.book.store@gmail.com>',
        to: user.email,
        subject: `Password recovery email`,
        html: `<h4>You are receiving this mail because a password reset was requested</h4>
            <p>Click the following link to start reseting your password: <a href="https://e-commerce-book-store.vercel.app/recovery/${ user.id }">Bookovich</a>.
            <br>Or copy & paste this URL in your browser: https://e-commerce-book-store.vercel.app/recovery/${ user.id }</p>
            <p>This mail was sent by a bot, do not respond! Thank you!</p>`
      }, ( err, info ) => {
        if ( err )
        {
          res.status( 400 ).send( err.message );
        } else
        {
          res.status( 200 ).json( info );
        }
      } );
  } catch ( err )
  {
    next( err );
  }
};

module.exports = {
  orderConfirmation,
  userCreated,
  newsletterUpdate,
  newOffers,
  passwordRecovery,
  specificOffer,
};
