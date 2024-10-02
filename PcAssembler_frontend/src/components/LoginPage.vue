<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <input type="text" id="email" v-model="email" required placeholder="Email" />
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
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      const loginMutation = `
        mutation($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token, user {
              id, firstname
            },
            errorMessage
          }
        }
      `
      const URL = 'http://localhost:3045/graphql'
      const variables = { email: this.email, password: this.password }

      try {
        // Send the login request to your GraphQL endpoint
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: loginMutation,
            variables: variables
          })
        })

        const result = await response.json()

        if (result.errors) {
          alert(`Login failed: ${result.errors[0].message}`)
        } else {
          const { token, user, errorMessage } = result.data.login

          if (errorMessage) {
            alert(`Login error: ${errorMessage}`)
          } else {
            // Save token in session storage
            sessionStorage.setItem('token', token)

            // Redirect or take further actions after successful login
            alert(`Welcome ${user.firstname}! You are logged in.`)
            // For example, you can route the user to a dashboard:
            // this.$router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('An error occurred during login.')
      }
    }
  }
}
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
  transition:
    background-color 0.3s,
    transform 0.2s; /* Smooth hover effect */
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
