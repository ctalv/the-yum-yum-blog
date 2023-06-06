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
  function setupFavoriteButton(recipeId) {
    // Function to handle the favorite button click
    const favoriteButton = document.getElementById('favorite-button');
    favoriteButton.addEventListener('click', function() {
      // Send an AJAX request to the server to save the favorite recipe
      fetch('/save-favorite', {
        method: 'POST',
        body: JSON.stringify({ recipeId: recipeId }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function(response) {
          if (response.ok) {
            alert('Recipe added to favorites!');
          } else {
            alert('Failed to add recipe to favorites.');
          }
        })
        .catch(function() {
          alert('An error occurred while processing the request.');
        });
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

  const saveRecipe = async (event) => {
    event.preventDefault();
  

      // Send a POST request to the API endpoint
      const response = await fetch('/dashboard', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    
  };

  document.querySelector("#favorite-button").addEventListener("submit", saveRecipe);