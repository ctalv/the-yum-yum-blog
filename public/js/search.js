document.addEventListener('DOMContentLoaded', function() {
    // Initialization of variables
    const searchInput = document.querySelector('.search-input');
    const apiKey = '684c8a5da04d4f7f99855c6cdeafa658';
    const mainCourseQuery = 'main course';
    const addRecipeInformation = true;
    const fillIngredients = true;
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${mainCourseQuery}&addRecipeInformation=${addRecipeInformation}&fillIngredients=${fillIngredients}`;
    const template = `
    {{#each recipes}}
    <div class="container-wrapper">
    <div class="background-box"></div>
    <div class="recipe-container">
      <div class="floating-tab">Popular For You!</div>
      <div class="recipe-card">
        <h3>{{this.title}}</h3>
      </div>
      <div class="carousel-container">
        <div id="recipeCarousel1" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/images/firstimg.jpeg" class="d-block w-100" alt="Placeholder Recipe 1">
            </div>
            <div class="carousel-item">
              <img src="/images/img2.jpeg" class="d-block w-100" alt="Placeholder Recipe 2">
            </div>
            <div class="carousel-item">
              <img src="/images/img3.webp" class="d-block w-100" alt="Placeholder Recipe 3">
            </div>
            <div class="carousel-item">
              <img src="/images/img2.jpeg" class="d-block w-100" alt="Placeholder Recipe 2">
            </div>
            <div class="carousel-item">
              <img src="/images/img3.webp" class="d-block w-100" alt="Placeholder Recipe 3">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#recipeCarousel1" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#recipeCarousel1" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    </div>
    {{/each}}`;
    function getSearchQuery() {
      const query = searchInput.value;
      const ingredient_url = url + `&includeIngredients=${query}`;
      return ingredient_url;
    }
    function getData(url) {
      console.log(url);
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
          const compiledTemplate = Handlebars.compile(template);
          // Create the HTML content with the rendered recipes
          const renderedHTML = compiledTemplate({ recipes });
          // Insert the rendered HTML into the container element
          const container = document.querySelector('.recipe-container');
          // Clear existing content
          container.innerHTML = '';
          // Insert the rendered HTML into the container
          container.insertAdjacentHTML('beforeend', renderedHTML);
        });
    }
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting
      const ingredient_url = getSearchQuery();
      getData(ingredient_url);
    });
  });