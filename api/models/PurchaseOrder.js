const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'PurchaseOrder',
		{
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			postal_code: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
