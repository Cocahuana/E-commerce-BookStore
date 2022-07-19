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
		},
		{ timestamps: false }
	);
};
