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
			curreny: {
				type: DataTypes.FLOAT,
			},
			description: {
				type: DataTypes.TEXT,
			},
			flag: {
				type: DataTypes.STRING,
				defaultValue: 'new',
			},
			rating: {
				type: DataTypes.FLOAT,
			},
			ratingCount: {
				type: DataTypes.INTEGER,
			},
			image: {
				type: DataTypes.TEXT,
			},
		},
		{ timestamps: false }
	);
};
