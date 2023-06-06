// import required modules
const sequelize = require('../config/connection');
const { User, Comment, Recipe } = require('../models');

// import JSON seed files
const userData = require('./userData.json');
const commentData = require('./commentData.json');
const recipeData = require('./recipeData.json')

// seeds the database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // create multiple Uer records in the database
  await User.bulkCreate(userData, {
    individualHooks: true, // enables Sequelize to run any defined hooks for each user creation
    returning: true, // created user objects are returned as a result
  });

  await Recipe.bulkCreate(recipeData);
  await Comment.bulkCreate(commentData);
  // terminate the script and exit the Node.js process
  process.exit(0);
};

// runs the seeding function
seedDatabase();