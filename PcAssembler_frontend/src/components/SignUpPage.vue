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
        <div class="form-group checkbox-container">
          <input type="checkbox" id="premium" v-model="isPremium" />
          <label for="premium">Sign up as a Premium User</label>
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
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000" location="top">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      isPremium: false, // Track if the user is signing up as premium
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  methods: {
    async handleSubmit() {
      const signUpMutation = `
      mutation($username:String, $email:String, $password:String, $isPremium: Boolean) 
      {signup(username:$username,email:$email,password:$password, isPremium: $isPremium)
        { 
          user{
              username,email
            }
            errorMessage
          }
        }
    `

      const URL = 'http://localhost:3045/graphql'
      const variables = {
        username: this.username,
        email: this.email,
        password: this.password,
        isPremium: this.isPremium
      }

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
        console.log(result)

        if (result.errors) {
          this.snackbar.text = `Sign Up failed`
          this.snackbar.color = 'error'
          this.snackbar.show = true
        } else {
          const { user, errorMessage } = result.data.signup

          if (errorMessage) {
            this.snackbar.text = `Signup error: ${errorMessage}`
            this.snackbar.color = 'error'
            this.snackbar.show = true
          } else {
            this.snackbar.text = `Sign Up successful: ${user.username}`
            this.snackbar.color = 'success'
            this.snackbar.show = true
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
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
.checkbox-container {
  display: flex; /* Use flexbox to align checkbox and label */
  align-items: center; /* Center items vertically */
  margin-top: 10px; /* Space above the checkbox section */
}
</style>
