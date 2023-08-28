const User = require('./User');
const Comment = require('./Comment');
const Recipe = require('./Recipe');
const SavedRecipes = require('./SavedRecipes')

SavedRecipes.belongsTo(User, {
  foreignKey: 'user_id', 
  targetKey: 'recipe_id', 
  as: 'User'
})

SavedRecipes.belongsTo(Recipe, {
  foreignKey: 'recipe_id', 
  targetKey: 'user_id', 
  as: 'Recipe'
})

// User has many Recipes
User.belongsToMany(Recipe, { 
  as: 'UserSaveRecipe',
  through: SavedRecipes,
  foreignKey: 'recipe_id'
  // through: 'SavedRecipes',
  // foreignKey: 'recipe_id',
  // otherKey: 'user_id'
});

// Recipe (fetched) has many User
Recipe.belongsToMany(User, {
  as: 'RecipeSaveUser',
  through: SavedRecipes,
  foreignKey: 'user_id'
  // through: 'SavedRecipes',
  // foreignKey: 'user_id',
  // otherKey: 'recipe_id'
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
