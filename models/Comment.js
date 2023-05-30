// import Model and Datypes class from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// class constructor
class Comment extends Model {

}

// define model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // recipe_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'recipe',
        //         key: 'id',
        //     },
        // },
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
        modelName: 'comment',
    }
)


// export model
module.exports = Comment;