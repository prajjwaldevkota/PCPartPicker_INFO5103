<template>
  <v-app>
    <v-container class="login-container" max-width="400">
      <v-card>
        <v-card-title class="text-center">
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              placeholder="Email"
              required
              outlined
              clearable
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              placeholder="Password"
              required
              outlined
              clearable
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              block
              class="login-button"
            >
              Login
            </v-btn>
          </v-form>
          <p class="forgot-password mt-3">
            Forgot your password? <a href="#">Click here</a>
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
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
              id, email
            },
            errorMessage
          }
        }
      `
      const URL = 'http://localhost:3045/graphql'
      const variables = { email: this.email, password: this.password }

      try {
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
            sessionStorage.setItem('token', token)
            alert(`Welcome ${user.email}! You are logged in.`)
            this.$router.push('/home')
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
  margin-top: 15vh;
}

.login-button {
  margin-top: 20px;
}

.forgot-password {
  margin-top: 10px;
}

.forgot-password a {
  color: #6D4C41;
  text-decoration: underline;
  transition: color 0.5s;
}

.forgot-password a:hover {
  color: #455A64;
}
</style>
