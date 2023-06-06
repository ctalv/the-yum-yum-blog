const favoriteBtnEl = document.querySelector('.favorite-btn');

const saveRecipe = async (event) => {
  event.preventDefault();
  // Send a POST request to the API endpoint
  const recipe_id = parseInt(window.location.pathname.split('/').pop());
  const title = document.querySelector('.title-el').textContent;
  const image = document.querySelector('.image-el').getAttribute('src');
  const ingredientEl = document.querySelector('.ingredient-el').children;
  const instructionEl = document.querySelector('.instruction-el').children;
  let ingredients = [];
  let instructions = [];

  for (let j = 0; j < ingredientEl.length; j++) {
    ingredient = ingredientEl[j].innerHTML
    ingredients.push(ingredient)
  }

  ingredients = ingredients.join(' ; ')


  for (let j = 0; j < instructionEl.length; j++) {
    let step = instructionEl[j].innerHTML
    instructions.push(step)
  }
  instructions = instructions.join(' ; ')
  console.log(instructions)
  // Send a POST request to the API endpoint with the recipe ID
  // const response = await fetch("/api/recipes", {
  const response = await fetch("/dashboard", {
    method: 'POST',
    body: JSON.stringify({ recipe_id, title, image, ingredients, instructions }),
    headers: { 'Content-Type': 'application/json' },
  });
  // console.log(recipeId)
  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace('/dashboard');
    // console.log(recipeId)
  } else if (response.error === 'Recipe ID already exists') {
      // If the recipe ID exists, redirect to the dashboard
      document.location.replace('/dashboard');
    
  } else {
    alert(response.statusText);
  }

};

favoriteBtnEl.addEventListener('click', saveRecipe);