// import Model and Datypes class from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// class constructor
class SavedRecipes extends Model {

}

// define model
SavedRecipes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id',
            },
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
        modelName: 'saved_recipes',
    }
)


// export model
module.exports = SavedRecipes;