const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'PurchaseOrder',
		{
			cart: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM(
					'open',
					'created',
					'processing',
					'approved',
					'cancelled'
				),
				allowNull: false,
			},
			// payment_id:{

			// }
		},
		{ timestamps: false }
	);
};
