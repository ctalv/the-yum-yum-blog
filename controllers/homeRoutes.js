const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../utils/auth');
require('dotenv').config();

const { Recipe, User } = require('../models');

apiKey = process.env.API_KEY;
const mainCourseQuery = 'main course';
const addRecipeInformation = true;
const fillIngredients = true;

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${mainCourseQuery}&addRecipeInformation=${addRecipeInformation}&fillIngredients=${fillIngredients}`;

// display recipes
router.get('/', async (req, res) => {
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        // id, title, ingredients, instruction, photo
        // console.log(data.results.length)
        const recipes = [];
        for (let i = 0; i < data.results.length; i++) {
          let recipeNum = data.results[i];

          let id = recipeNum.id;
          let title = recipeNum.title;
          let image = recipeNum.image;
          let instructionsAll = recipeNum.analyzedInstructions[0].steps
          let ingredientsAll = recipeNum.missedIngredients;
          let ingredientArr = [];
          let instructionArr = [];

          for (let j = 0; j < ingredientsAll.length; j++) {
            ingredientTotal = `${ingredientsAll[j].amount} ${ingredientsAll[j].unitShort} ${ingredientsAll[j].name}`
            ingredientArr.push(ingredientTotal)
          }

          ingredientArr = ingredientArr.join(' ; ')

          for (let j = 0; j < instructionsAll.length; j++) {
            let step = instructionsAll[j].step
            instructionArr.push(step)
          }
          instructionArr = instructionArr.join(' ; ')

          // console.log(ingredientArr);
          // console.log(instructionArr);
          // console.log(id, title, image);

          let recipe = {
            id: id,
            title: title,
            image: image,
            ingredients: ingredientArr,
            instructions: instructionArr
          };

          recipes.push(recipe); // Add each recipe to the recipes array
        }


        req.session.recipes = recipes;
        
        // console.log(recipes)
        res.render('homepage', {
          recipes: recipes,
        });
        // res.status(200).json(recipes);
      })
      .catch(error => {
        console.log('Error:', error);
      });

  } catch (err) {
    res.status(500).json(err);
  }
});


// const urlTwo = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${mainCourseQuery}&addRecipeInformation=${addRecipeInformation}&fillIngredients=${fillIngredients}`;

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeId = await req.params.id
    const recipes = await req.session.recipes;
    // console.log(recipe.id)
    const recipe = recipes.find(recipe => recipe.id === parseInt(recipeId));
    const ingredients = recipe.ingredients.split(' ; ');
    const instructions = recipe.instructions.split(' ; ');
    console.log(ingredients)
    console.log(recipe)
    // const recipe = recipeData.get({ plain: true });
    // res.status(200).json(recipe);
    res.render('recipe', {
      ...recipe,
      // logged_in: req.session.logged_in
      ingredients: ingredients,
      instructions: instructions,
      notSaved: req.path.startsWith('/recipe/')
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }]


    })

    if (!userData) {
      res.status(404).json({ message: 'No user with that id.' })
      return
    }
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const user = userData.get({ plain: true });
    const recipes = user.Recipes;
    console.log(recipes);

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });

    // res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err)
  }
})

// post route for saving a recipe
router.post('/dashboard', async (req, res) => {
  
  try {
   
    const recipes = await req.session.recipes;
    const recipeId = req.body;
    const recipe = recipes.find(recipe => recipe.id === parseInt(recipeId));


    console.log(ingredients)
    console.log(recipe)
    const recipeData = await Recipe.create({
      recipe,
      user_id: req.session.user_id,
    });
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/dashboard/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id)

    const recipe = recipeData.get({ plain: true });
    const ingredients = recipe.ingredients.split(' ; ');
    const instructions = recipe.instructions.split(' ; ');
    // const recipe = recipeData.get({ plain: true });
    // res.status(200).json(recipe);
    res.render('recipe', {
      ...recipe,
      logged_in: req.session.logged_in,
      ingredients: ingredients,
      instructions: instructions
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');

});

module.exports = router;
