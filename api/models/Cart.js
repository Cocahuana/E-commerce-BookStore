const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Cart',
		{
			id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
			status:{
                type: DataTypes.ENUM(["Active", "Disabled"]),
                defaultValue: "Active",
            },
			totalPrice:{
				type: DataTypes.FLOAT,
				defaultValue: 0,
			}
		},
		{ timestamps: false }
	);
};
