<template>
  <div class="signup-page">
    <div class="signup-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input type="text" id="username" v-model="username" required placeholder="Username" />
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="email" required placeholder="Email" />
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" required placeholder="Password" />
        </div>
        <div class="button-container">
          <button type="submit" class="submit-button">Sign Up</button>
          <button type="button" class="back-button" @click="goBack">Back</button>
        </div>
      </form>
      <p class="already-account">
        Already have an account? <a href="/login" class="login-link">Login here</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const signUpMutation = `
      mutation($username:String, $email:String, $password:String) 
      {signup(username:$username,email:$email,password:$password)
        { 
          user{
              username,email
            }
          }
        }
    `

      const URL = 'http://localhost:3045/graphql'
      const variables = { username: this.username, email: this.email, password: this.password }

      try {
        // Send the login request to your GraphQL endpoint
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: signUpMutation,
            variables: variables
          })
        })

        const result = await response.json()

        if (result.errors) {
          alert(`Sign Up failed: ${result.errors[0].message}`)
        } else {
          const { user, errorMessage } = result.data.signup

          if (errorMessage) {
            alert(`Signp error: ${errorMessage}`)
          } else {
            // Redirect or take further actions after successful login
            alert(`Sign Up successful: ${user.username}`)
          }
        }
      } catch (error) {
        console.error('Signup error:', error)
        alert('An Signup occurred during.')
      }
    },
    goBack() {
      this.$router.push('/') // Navigate back to the previous page (change as needed)
    }
  }
}
</script>

<style>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.signup-container {
  max-width: 100vh;
  padding: 75px 150px; /* Adjusted padding */
  background: linear-gradient(135deg, #4b6cb7, #182848); /* Gradient background */
  color: #fff; /* White text */
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  font-family: 'Arial', sans-serif; /* Use a modern font */
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%; /* Set to 100% for full width */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff; /* Light input background */
  color: #333; /* Dark text for inputs */
  transition: border 0.3s; /* Transition for focus effect */
}

input::placeholder {
  color: #888; /* Placeholder text color */
}

input:focus {
  outline: none;
  border: 2px solid #8e44ad; /* Focus border color */
}

.button-container {
  display: flex; /* Flexbox for side-by-side buttons */
  justify-content: space-between; /* Space between buttons */
  margin-top: 10px; /* Spacing above the button container */
}

.submit-button {
  flex: 1; /* Allow button to grow */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #8e44ad; /* Purple button */
  color: #fff; /* White text */
  cursor: pointer;
  font-size: 16px;
  transition:
    background-color 0.3s,
    transform 0.3s; /* Button hover and transition effect */
  margin-right: 5px; /* Space between buttons */
}

.submit-button:hover {
  background-color: #732d91; /* Darker purple on hover */
  transform: translateY(-2px); /* Subtle lift effect */
}

.submit-button:active {
  transform: translateY(0); /* Reset lift on click */
}

.back-button {
  flex: 1; /* Allow button to grow */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #000; /* Black button */
  color: #fff; /* White text */
  cursor: pointer;
  font-size: 16px;
  transition:
    background-color 0.3s,
    transform 0.3s; /* Button hover and transition effect */
}

.back-button:hover {
  background-color: #333; /* Darker black on hover */
  transform: translateY(-2px); /* Subtle lift effect */
}

.back-button:active {
  transform: translateY(0); /* Reset lift on click */
}

.already-account {
  text-align: center;
  margin-top: 20px;
  color: #fff; /* White text */
}

.login-link {
  color: #8e44ad; /* Link color */
  text-decoration: underline;
}
</style>
