// Logout user
const logout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      console.log('ok', response)
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  };
  
  // Event Listener
  document.querySelector("#logout").addEventListener("click", logout);