const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Comment',
		{
			//generates ID automatically
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW,
			},
		},
		{ timestamps: false }
	);
};
