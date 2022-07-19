const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('favorite_list', {}, { timestamps: false });
};
