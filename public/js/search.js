document.addEventListener('DOMContentLoaded', function() {
  // Initialization of variables
  const searchInput = document.querySelector('.search-input');

  function getData(query) {
    window.location.replace('/search/' + query);
  }

  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const query = searchInput.value;
    getData(query);
  });
});