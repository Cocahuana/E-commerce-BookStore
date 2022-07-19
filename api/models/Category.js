const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define(
		'category',
		{
			category: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
