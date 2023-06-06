const User = require('./User');
const Comment = require('./Comment');
const Recipe = require('./Recipe');

// User has many Recipes
User.hasMany(Recipe, { 
  // through: 'SavedRecipes',
  foreignKey: 'user_id',
  // sourceKey: 'id'
});

// Recipe (fetched) has many User
Recipe.belongsTo(User, {
  // through: 'SavedRecipes',
  foreignKey: 'user_id'
});

// User has many Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
  sourceKey: 'id'
});

// Comment has one User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Recipe has many Comment
Recipe.hasMany(Comment, {
  foreignKey: 'recipe_id',
  sourceKey: 'id'
});

// Comment belongs to Recipe
Comment.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
});


module.exports = { User, Comment, Recipe };
