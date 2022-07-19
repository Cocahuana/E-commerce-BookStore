const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
 sequelize.define('Book', { //generates ID automatically    
    title:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description:{
        type: DataTyprs.TEXT,
    },
    rating:{
        type: DataTypes.INTEGER, 
    }
}, {timestamps: false})
}