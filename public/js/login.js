// Function to clear the form inputs
const clearFormInputs = () => {
    document.querySelector("#display_name").value = "";
    document.querySelector("#email-login").value = "";
    document.querySelector("#new-password-login").value = "";
  };
  
  // Signup form handler
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const displayName = document.querySelector("#display_name").value.trim();
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#new-password-login").value.trim();
  
    if (displayName && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ displayName, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
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
  
  // Prevent form field auto-fill by adding autocomplete="off"
  document.querySelector("#display_name").setAttribute("autocomplete", "off");
  document.querySelector("#email-login").setAttribute("autocomplete", "off");
  document.querySelector("#new-password-login").setAttribute("autocomplete", "off");