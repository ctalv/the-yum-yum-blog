document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel
    var recipeCarousel = new bootstrap.Carousel(document.getElementById('recipeCarousel'), {
      interval: 5000, // Set the interval between slide transitions (in milliseconds)
      keyboard: true, // Enable keyboard navigation
      pause: 'hover' // Pause the carousel on mouse hover
    });
  });

  // Example of verifying session storage usage in a front-end JavaScript file
// This code assumes you've set some data in session storage

