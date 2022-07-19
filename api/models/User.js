const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'user',
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			profile_picture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{ timestamps: false }
	);
};
