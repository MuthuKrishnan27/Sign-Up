const myform = document.getElementById("myform");
const messagecontainer = document.getElementsByClassName("message-container")[0];

// const signupBtn = document.getElementById("signupBtn");
let accessToken = localStorage.getItem('accessToken');
console.log("Access Token: ",accessToken);
// On submitting form
myform.addEventListener('submit',(e) => {
  e.preventDefault();

//    Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password1 = document.getElementById('new-password').value.trim();
    const password2 = document.getElementById('confirm-password').value.trim();
    myform.reset();
    // Perform form validation
    if (!name || !email || !password1 || !password2) {
      showMessage('Error: All the fields are mandatory', 'error');
      return;
    }
    else if(password1 !== password2){
      showMessage('Password is not matching!', 'error');
      return;
    }
    else if(!isValidEmail(email)){
      showMessage('Email is not valid!', 'error');
      return;
    }
    else{
        showMessage('Successfully signed up', 'success');
    }
    // Generate random access token
    accessToken = generateAccessToken();

    // Create user state
    const user = {
      Name:`${name}`,
      Email:`${email}`,
      Password:`${password1}`,
    };

    // Store user state in local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);

    // Redirect to profile page after a delay
    setTimeout(() => {
      redirectToProfile();
    }, 2000);
  });

  function redirectToProfile() {
    window.location.href = './profile.html';
  }

// Generating access token
function generateAccessToken() {
  // Generate random 16-byte access token
  const token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return token;
}

// Show Message Error or Success
function showMessage(message, messageType) {
    messagecontainer.innerHTML = '';
    const messageElement = document.createElement('span');
    messageElement.textContent = message;

    if (messageType === 'error') {
    messageElement.style.color = 'red';
    messageElement.id = 'error';
    } else if (messageType === 'success') {
    messageElement.style.color = 'green';
    }

    messagecontainer.appendChild(messageElement);
}

//To check valid email 
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isaccessTokenPresent(){
  if(!accessToken){
    let a = document.getElementsByTagName('a')[1];
    a.href=`#`;
    console.log('Access Token is not availabe')
  }
}