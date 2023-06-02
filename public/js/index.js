$(document).ready(function() {
    // Initialize the Bootstrap carousel
    $('#recipeCarousel').carousel();
  
    // Add event listeners for the carousel control buttons
    $('.carousel-control-prev').click(function() {
      $('#recipeCarousel').carousel('prev');
    });
  
    $('.carousel-control-next').click(function() {
      $('#recipeCarousel').carousel('next');
    });
  });