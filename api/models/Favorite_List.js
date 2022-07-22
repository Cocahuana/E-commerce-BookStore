const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('Favorite_List', {}, { timestamps: false });
};
