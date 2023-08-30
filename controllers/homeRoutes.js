const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../utils/auth');
require('dotenv').config();

const { Recipe, User, SavedRecipes } = require('../models');

apiKey = process.env.API_KEY;
const mainCourseQuery = 'main course';
const addRecipeInformation = true;
const fillIngredients = true;

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${mainCourseQuery}&addRecipeInformation=${addRecipeInformation}&fillIngredients=${fillIngredients}`;

// display a recipe on homepage
router.get('/', async (req, res) => {


  try {
    fetch(url)
      .then(response => response.json())
      .then(data => {
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
          instructionArr = instructionArr.join(' ; ');

          let recipe = {
            id: id,
            title: title,
            image: image,
            ingredients: ingredientArr,
            instructions: instructionArr
          };

          console.log(recipe)

          recipes.push(recipe); // Add each recipe to the recipes array
        }

        req.session.recipes = recipes;

        console.log("get homepage", recipes)

        res.render('homepage', {
          recipes: recipes,
          logged_in: req.session.logged_in,
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });

  } catch (err) {
    res.status(500).json(err);
  }
});


// to view an individual recipe
router.get('/recipe/:id', async (req, res) => {
  try {
    console.log(req.params)
    const recipeId = await req.params.id;
    const recipes = await req.session.recipes;
    // console.log(req.session.recipes)
    const recipe = await recipes.find(recipe => recipe.id === parseInt(recipeId));
    // console.log(recipe)
    const ingredients = recipe.ingredients.split(' ; ');
    const instructions = recipe.instructions.split(' ; ');
    res.render('recipe', {
      ...recipe,
      ingredients: ingredients,
      instructions: instructions,
      notSaved: req.path.startsWith('/recipe/'),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// show a logged in user's saved recipes
router.get('/dashboard', async (req, res) => {
  try {


    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {

      console.log(1, req.session.user_id)

      const recipeData = await SavedRecipes.findAll({
        where: {
          user_id: req.session.user_id,
        },
      })

      console.log(2, recipeData)


      // if (!recipeData) {
      //   // res.status(404).json({ message: 'No user with that id.' })
      //   console.log(3)
      //   res.render('/dashboard', {
      //     // logged_in: req.session.logged_in
      //   });
      // }

      let savedArray = []

      for (let i = 0; i < recipeData.length; i++) {
        const saveTest = recipeData[i].dataValues.recipe_id
        savedArray.push(saveTest)
        console.log(saveTest)
        console.log(savedArray)
      }

      console.log(savedArray)


      const recipes = await Recipe.findAll({
        where: {
          id: savedArray,
        },
      })

      console.log("get dashboard", recipes.dataValues)

      const recipesDataValues = recipes.map((recipe) => recipe.dataValues)

      res.render('dashboard', {
        recipes: recipesDataValues,
        logged_in: req.session.logged_in,
      });

    }

    // res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err)
  }
})

// save recipe for a user
router.post('/dashboard', async (req, res) => {
  const { recipe_id, title, image, ingredients, instructions } = req.body;
  console.log(recipe_id, 1)
  try {
    // console.log(req.body)
    // console.log(SavedRecipes)
    // console.log(Recipe)
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const existingRecipe = await Recipe.findByPk(recipe_id);
    console.log(existingRecipe)

    if (!existingRecipe) {
      // If the recipe already exists, return an error message or take appropriate action
      // add recipe_id association and user_id association

      await Recipe.create({
        id: recipe_id,
        title,
        image,
        ingredients,
        instructions,
      });

      const savedRecipeData = await SavedRecipes.create({
        recipe_id: recipe_id,
        user_id: req.session.user_id
      })
      res.status(200).json(savedRecipeData);

      return res.redirect('/dashboard');
    } else {

      const savedRecipeData = await SavedRecipes.create({
        recipe_id,
        user_id: req.session.user_id
      })
      res.status(200).json(savedRecipeData);
      return res.redirect('/dashboard');

    }

    // await SavedRecipes.create({
    //   user_id: req.session.user_id,
    //   recipe_id: recipe_id,
    //   title,
    //   image,
    //   ingredients, 
    //   instructions
    // });

  } catch (err) {
    res.status(400).json(err)
  }
});

// to view an individual saved recipe
router.get('/dashboard/recipe/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id)

    const recipe = recipeData.get({ plain: true });
    const ingredients = recipe.ingredients.split(' ; ');
    const instructions = recipe.instructions.split(' ; ');
    // const recipe = recipeData.get({ plain: true });
    // res.status(200).json(recipe);

    let isSaved = false;
    // if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id);
    if (user) {
      const savedRecipe = await SavedRecipes.findOne({
        where: {
          user_id: user.id,
          recipe_id: recipe.id
        }
      });
      if (savedRecipe) {
        isSaved = true;
      }
    }
    // }

    res.render('recipe', {
      ...recipe,
      logged_in: req.session.logged_in,
      ingredients: ingredients,
      instructions: instructions,
      is_saved: isSaved
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    search_url = url + `&includeIngredients=${query}`

    fetch(search_url)
      .then(response => response.json())
      .then(data => {
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
          instructionArr = instructionArr.join(' ; ');

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

        res.render('homepage', {
          recipes: recipes,
          logged_in: req.session.logged_in

        })
      });

  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');

});

module.exports = router;
