const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define(
		'language',
		{
			language: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
