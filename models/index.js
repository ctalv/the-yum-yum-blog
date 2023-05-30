const User = require('./User');
const Comment = require('./Comment');
// const Recipe = require('./Recipe');

// User has many Recipes
// Recipe has one User

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
// Comment belongs to Recipe


module.exports = { User, Comment};
