require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { VITE_DB_USER, VITE_DB_PASSWORD, VITE_DB_HOST, DB_NAME, PORT } =
	process.env;

/* Deploy backend start*/
// Here we made the connection to the DB in Heroku
// DB_NAME will be assigned by heroku randomly

let sequelize =
	process.env.NODE_ENV === "production"
		? new Sequelize({
				database: DB_NAME,
				dialect: "postgres",
				host: VITE_DB_HOST,
				port: PORT || "PORT ERROR :v",
				username: VITE_DB_USER,
				password: VITE_DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						// Ref.: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${VITE_DB_USER}:${VITE_DB_PASSWORD}@${VITE_DB_HOST}/books`,
				{ logging: false, native: false }
		  );

/* Deploy backend end*/

//Commented code below is not longer needed

// const sequelize = new Sequelize(
// 	`postgres://${VITE_DB_USER}:${VITE_DB_PASSWORD}@${VITE_DB_HOST}/books`,
// 	{
// 		logging: false, // set to console.log to see the raw SQL queries
// 		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// 	}
// );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, PurchaseOrder, Language, Genre, Comment, Books, Cart } =
	sequelize.models;

let Cart_Books = sequelize.define(
	"Cart_Books",
	{
		amount: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
	},
	{ timestamps: false }
);

// Aca vendrian las relaciones

Books.belongsToMany(PurchaseOrder, {
	through: "order_books",
	timestamps: false,
});
PurchaseOrder.belongsToMany(Books, {
	through: "order_books",
	timestamps: false,
});

Books.belongsToMany(Genre, { through: "genre_books", timestamps: false });
Genre.belongsToMany(Books, { through: "genre_books", timestamps: false });

Books.belongsToMany(Language, { through: "language_books", timestamps: false });
Language.belongsToMany(Books, { through: "language_books", timestamps: false });

Books.hasMany(Comment, { timestamps: false });
Comment.belongsTo(Books, { timestamps: false });
User.hasMany(Comment, { timestamps: false });
Comment.belongsTo(User, { timestamps: false });

Cart.belongsToMany(Books, { through: Cart_Books });
Books.belongsToMany(Cart, { through: Cart_Books });
User.hasMany(Cart);
Cart.belongsTo(User);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
