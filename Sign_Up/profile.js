// profile.js
document.addEventListener('DOMContentLoaded', () => {
     const accessToken = localStorage.getItem('accessToken');
    const userDetailsContainer = document.getElementsByClassName("user-details")[0];
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      // Clear user state from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
  
      // Redirect to signup page
      redirectToSignup();
    });
    
    // Check if the current page is /profile.html and redirect if no access token exists
    if (!accessToken) {
      redirectToSignup();
    } 
    else {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log("User->",user);
      showUserDetails(user);
    }
  
    function redirectToSignup() {
      window.location.href = './signup.html';
    }
  
    function showUserDetails(user) {
     
      userDetailsContainer.innerHTML = `
                <div>
                    <h1>Profile</h1>
                </div>
                 <div>
                    <span>Full Name : </span>
                    <span>${user.Name}</span>
                </div>
                <div>
                    <span>Email : </span>
                    <span>${user.Email}</span>
                </div>
                <div>
                    <span>Password : </span>
                    <span>${user.Password}</span>
                </div> `;
    }
  });
  