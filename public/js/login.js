// Function to clear the form inputs
const clearFormInputs = () => {
    document.querySelector("#display_name").value = "";
    document.querySelector("#email-login").value = "";
    document.querySelector("#new-password-login").value = "";
  };
  
  const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
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
    }
  };

  // Signup form handler
  const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log(01)
    const displayName = document.querySelector("#display_name").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#new-password-signup").value.trim();
  
    if (displayName && email && password) {
      console.log(02)
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ displayName, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log(03)
        // Get the display name from the response
        const responseData = await response.json();
        const savedDisplayName = responseData.display_name;
  
        // Redirect the user to the home page with the display name displayed on the upper right corner
        const baseURL = window.location.origin; // Get the base URL
        const homeURL = `${baseURL}/`; // Construct the home page URL
        window.location.href = homeURL + "?display_name=" + encodeURIComponent(savedDisplayName);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Add event listener to the signup form
  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
  
  // Call the clearFormInputs function when the page loads
  window.addEventListener("load", clearFormInputs);

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  
  // Prevent form field auto-fill by adding autocomplete="off"
  document.querySelector("#display_name").setAttribute("autocomplete", "off");
  document.querySelector("#email-login").setAttribute("autocomplete", "off");
  document.querySelector("#new-password-login").setAttribute("autocomplete", "off");