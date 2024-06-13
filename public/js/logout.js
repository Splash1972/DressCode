const logout = async (event) => {
  event.preventDefault()
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };
  
  $("#logout").on("click", logout);