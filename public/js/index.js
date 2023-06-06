document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel
    var recipeCarousel = new bootstrap.Carousel(document.getElementById('recipeCarousel'), {
      interval: 5000, // Set the interval between slide transitions (in milliseconds)
      keyboard: true, // Enable keyboard navigation
      pause: 'hover' // Pause the carousel on mouse hover
    });
  });