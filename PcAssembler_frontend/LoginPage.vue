<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input type="text" id="username" v-model="username" required placeholder="Username" />
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" required placeholder="Password" />
        </div>
        <button type="submit" class="login-button">Login</button>
        <p class="forgot-password">Forgot your password? <a href="#">Click here</a></p> 
      </form>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Handle login logic here
        alert(`Logging in with username: ${this.username}`);
      },
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    text-align: center;
    margin-top: 50px;
    color: white; /* White text */
    max-width: 400px;
    margin: auto;
  }
  
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  
  .login-form {
    background: linear-gradient(135deg, #4b6cb7, #182848); /* Gradient background */
    padding: 50px 120px; /* Adjusted padding */
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .form-group {
    margin: 20px 0; /* Increased margin for spacing */
    /*text-align: left;  Align labels to the left */
  }
  
  input {
    width: 100%; /* Set to 100% for full width */
    padding: 10px; /* Increased padding for larger input fields */
    margin: 5px 0;
    border: none;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  input::placeholder {
    color: #888; /* Placeholder text color */
  }
  
  input:focus {
    border: 2px solid #9c27b0; /* Purple border on focus */
  }
  
  .login-button {
    width: 100%;
    padding: 12px; /* Increased padding for button */
    background-color: #9c27b0; /* Purple background */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    transition: background-color 0.3s, transform 0.2s; /* Smooth hover effect */
  }
  
  .login-button:hover {
    background-color: #7b1fa2; /* Darker purple on hover */
    transform: scale(1.05); /* Slightly enlarge button */
  }
  
  .forgot-password {
    margin-top: 10px; /* Adjusted margin for better spacing */
  }
  
  .forgot-password a {
    color: #9c27b0;
    text-decoration: underline;
    transition: color 0.3s;
  }
  
  .forgot-password a:hover {
    color: #7b1fa2; /* Change link color on hover */
  }
  </style>
  