require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/books`,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	}
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js'
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
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
const {
	User,
	PurchaseOrder,
	Language,
	Category,
	Comment,
	Books,
	Favorite_List,
} = sequelize.models;

// Aca vendrian las relaciones

/*Books.belongsToMany(PurchaseOrder, {through: order_books, timestamps: false});
PurchaseOrder.belongsToMany(Books, {through: order_books, timestamps: false});


Books.belongsToMany(Category, {through: category_books, timestamps: false}); 
Category.belongsToMany(Books, {through: category_books, timestamps: false});

Books.belongsToMany(Language, {through: language_books, timestamps: false});
Language.belongsToMany(Books, {through: language_books, timestamps: false});


Books.belongsToMany(Favorite_List, {through: favorite_books, timestamps: false});
Favorite_List.belongsToMany(Books, {through: favorite_books, timestamps: false});*/


module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
