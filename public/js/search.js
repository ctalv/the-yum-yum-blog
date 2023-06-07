document.addEventListener('DOMContentLoaded', function() {
  // Initialization of variables
  const searchInput = document.querySelector('.search-input');
  const apiKey = '93cacfb6a8ad4711a25e3079bc0b74b2';
  const mainCourseQuery = 'main course';
  const addRecipeInformation = true;
  const fillIngredients = true;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${mainCourseQuery}&addRecipeInformation=${addRecipeInformation}&fillIngredients=${fillIngredients}`;
  function getSearchURL() {
    const query = searchInput.value;
    const ingredient_url = url + `&includeIngredients=${query}`;
    return ingredient_url;
  }
  function getData(url) {
    url = getSearchURL();
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(data => {
        const recipes = [];
        for (let i = 0; i < data.results.length; i++) {
          let recipeNum = data.results[i];
          let id = recipeNum.id;
          let title = recipeNum.title;
          let image = recipeNum.image;
          let instructionsAll = recipeNum.analyzedInstructions[0].steps;
          let ingredientsAll = recipeNum.missedIngredients;
          let ingredientArr = [];
          let instructionArr = [];
          for (let j = 0; j < ingredientsAll.length; j++) {
            let ingredientTotal = `${ingredientsAll[j].amount} ${ingredientsAll[j].unitShort} ${ingredientsAll[j].name}`;
            ingredientArr.push(ingredientTotal);
          }
          ingredientArr = ingredientArr.join(' ; ');
          for (let j = 0; j < instructionsAll.length; j++) {
            let step = instructionsAll[j].step;
            instructionArr.push(step);
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
        fetch('/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ recipes: recipes })
        })
          .then(response => {
            document.location.replace('/');
          })
          .catch(error => {
            // Handle any errors that occurred during the request
          });
      });
  }
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const query = searchInput.value;
    const searchUrl = `/search?query=${query}`;
    getData(searchUrl);
  });
});