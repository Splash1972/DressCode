// login handler - verifes user credentials and logs in the user
const loginFormHandler = async (event) => {
    event.preventDefault();
    $('#loginMessage').remove();
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val().trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.ok);
  
      if (response.ok) {
        document.location.replace('/homepage-attire');
      } else {
        const data = await response.json();
  
        $('#loginForm').prepend($('<div>', {
          class: "alert alert-danger",
          id: "loginMessage",
          html: `<span>${data.message}</span>`
        }));
  
      }
    }
  };
  $('#loginForm').on('submit', loginFormHandler);
  
  
  // registration form handler
  const registerFormHandler = async (event) => {
    event.preventDefault();
    $('#registerMessage').remove();
    const firstName = $('#registerFirstName').val().trim();
    const lastName = $('#registerLastName').val().trim();
    const email = $('#registerEmail').val().trim();
    const password = $('#registerPassword').val().trim();
    const confirmPassword = $('#registerConfirmPassword').val().trim();

    console.log(firstName, lastName);
  
    if (password !== confirmPassword) {
      $('#registerForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "registerMessage",
        html: "<span>The passwords do not match. Please try again!</span>"
      }));
      return;
    }
  
    if (!/.{8,}/.test(password)) {
      $('#registerForm').prepend($('<div>', {
        class: "alert alert-danger",
        id: "registerMessage",
        html: "<span>The password must be minimum 8 characters long. Please try again!</span>"
      }));
      return;
    }
  
  
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response.ok);
  
      if (response.ok) {
        document.location.replace('/homepage-attire');
      } else {
        const data = await response.json();
  
        $('#registerForm').prepend($('<div>', {
          class: "alert alert-danger",
          id: "registerMessage",
          html: "<span>Could not register new user. Please try again!</span>"
        }));
  
      }
    }
  };
  $('#registerForm').on('submit', registerFormHandler);
  