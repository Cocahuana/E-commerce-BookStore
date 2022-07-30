const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Books',
		{
			//generates ID automatically
			title: {
				type: DataTypes.TEXT, //cambiado a text sino tira error
				allowNull: false,
			},
			authors: {
				//en la api viene como authors, fue cambiado
				type: DataTypes.STRING,
				//allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: true, //acordarse de este cambio. Agregar default?
			},
			description: {
				type: DataTypes.TEXT,
			},
			rating: {
				type: DataTypes.FLOAT,
			},
			image: {
				type: DataTypes.TEXT,
			},
			previewLink: {
				type: DataTypes.TEXT,
			},
			flag: {
				type: DataTypes.STRING,
				defaultValue: 'new',
			},
			salePrice: {
				type: DataTypes.FLOAT,
			},
			currency: {
				type: DataTypes.STRING,
			},
			ratingCount: {
				type: DataTypes.INTEGER,
			},
			stock: {
				type: DataTypes.INTEGER,
				defaultValue: 50,
			}
		},
		{ timestamps: false }
	);
};
