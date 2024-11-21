<template>
  <v-app>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 pa-6">
            <v-card-title class="text-center text-h5 mb-4">
              Login
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  required
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>
                
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  required
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>
                
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  :loading="loading"
                  class="mb-2"
                >
                  Login
                </v-btn>
              </v-form>

              <div class="text-center mt-4">
                <v-btn
                  variant="text"
                  color="primary"
                  @click="$router.push('/signup')"
                >
                  Create Account
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="top"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  methods: {
    showNotification(text, color = 'success') {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },

    async handleLogin() {
      this.loading = true;
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
          this.showNotification(result.errors[0].message, 'error');
        } else {
          const { token, user, errorMessage } = result.data.login

          if (errorMessage) {
            this.showNotification(errorMessage, 'error');
          } else {
            sessionStorage.setItem('token', token);
            this.showNotification(`Welcome back, ${user.email}!`);
            
            // Wait for snackbar to show before redirecting
            setTimeout(() => {
              this.$router.push('/home');
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        this.showNotification('An error occurred during login.', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>

.v-card {
  border-radius: 12px;
}

.v-btn {
  text-transform: none;
}
</style>