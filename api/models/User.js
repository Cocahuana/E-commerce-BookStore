const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			password: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			profile_picture: {
				type: DataTypes.TEXT,
				//defaultValue:
					//'https://media.istockphoto.com/vectors/man-reading-book-and-question-marks-vector-id1146072534?k=20&m=1146072534&s=612x612&w=0&h=sMqSGvSjf4rg1IjZD-6iHEJxHDHOw3ior1ZRmc-E1YQ=',
			},

			status: {
				type: DataTypes.ENUM(['Admin', 'User', 'Banned']),
				defaultValue: 'User',
			},

			favorites: {
				type: DataTypes.JSON,
				defaultValue: [],
			},

			subscribed: {
				type: DataTypes.ENUM(['Subscribed', 'Unsubscribed']),
				defaultValue: 'Unsubscribed',
			},
		},
		{ timestamps: false }
	);
};
