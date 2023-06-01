// import Model and Datypes class from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// class constructor
class Recipe extends Model {

}

// define model
Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
)


// export model
module.exports = Recipe;