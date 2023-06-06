function getRecipe(recipeId) {
    // Display a placeholder or loading state
    showPlaceholder();
  
    // Make an API request to retrieve the recipe data
    makeApiRequest('/recipes/' + recipeId)
      .then(function(response) {
        // Recipe data retrieved successfully
        hidePlaceholder();
        displayRecipe(response.data);
      })
      .catch(function(error) {
        // Error occurred while retrieving the recipe
        hidePlaceholder();
        displayErrorMessage(error.message);
      });
  }
  
  function showPlaceholder() {
    // Show the placeholder or loading state element
    const placeholderElement = document.getElementById('placeholder');
    placeholderElement.style.display = 'block';
  }
  
  function hidePlaceholder() {
    // Hide the placeholder or loading state element
    const placeholderElement = document.getElementById('placeholder');
    placeholderElement.style.display = 'none';
  }
  
  function displayRecipe(recipeData) {
    // Display the retrieved recipe data on the page
    const recipeTitleElement = document.getElementById('recipe-title');
    const recipeIngredientsElement = document.getElementById('recipe-ingredients');
    const recipeInstructionsElement = document.getElementById('recipe-instructions');
  
    recipeTitleElement.textContent = recipeData.title;
    recipeIngredientsElement.textContent = recipeData.ingredients;
    recipeInstructionsElement.textContent = recipeData.instructions;
  }
  
  function displayErrorMessage(errorMessage) {
    // Display an error message on the page
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = errorMessage;
  }