<template>
  <v-app>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4" v-if="!isLoggedIn">
          <v-card class="elevation-12 pa-6">
            <v-card-title class="text-center text-h5 mb-4"> Admin Login </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="adminName"
                  label="Admin Name"
                  required
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>

                <v-btn type="submit" color="primary" block :loading="loading" class="mb-2">
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-else>
          <v-card class="pa-4 mt-12">
            <div class="pa-4 text-h4">Admin Dashboard</div>
            <div class="mt-12 pa-4 text-h5">User Feedback for Website</div>
            <v-row>
              <v-col v-for="survey in surveys" :key="survey._id" cols="12" md="6" lg="8">
                <v-card class="h-100">
                  <v-card-text>
                    <div class="pa-4 text-h6">
                      Total Feedback Count: {{ survey.numTotalFeedback }}
                    </div>
                    <div class="pa-4 text-h6">
                      Number of Amazing Ratings: {{ survey.numAmazing }}
                    </div>
                    <div class="pa-4 text-h6">Number of Good Ratings: {{ survey.numGood }}</div>
                    <div class="pa-4 text-h6">Number of Ok Ratings: {{ survey.numOk }}</div>
                    <div class="pa-4 text-h6">Number of Bad Ratings: {{ survey.numBad }}</div>
                    <div class="pa-4 text-h6">Number of Awful Ratings: {{ survey.numAweful }}</div>
                    <v-btn color="red" @click="logout">Logout</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000" location="top">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar.show = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'AdminPage',
  data() {
    return {
      adminName: '',
      password: '',
      loading: false,
      isLoggedIn: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      },
      surveys: [],
      surveyQuery: `query {
        getUserSurvey {    
              numTotalFeedback,
              numAmazing,
              numGood,
              numOk,
              numBad,
              numAweful,  
            }
        }`
    }
  },
  methods: {
    showNotification(text, color = 'success') {
      this.snackbar.text = text
      this.snackbar.color = color
      this.snackbar.show = true
    },
    checkAdminStatus() {
      const token = sessionStorage.getItem('token')
      const isAdmin = sessionStorage.getItem('isAdmin')
      if (token && isAdmin) {
        this.isLoggedIn = true // Admin is logged in
      }
    },
    logout() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('isAdmin')
      this.isLoggedIn = false // Reset logged in status
      this.showNotification('Successfully logged out.', 'info')
    },
    async handleLogin() {
      this.loading = true
      const loginMutation = `
        mutation($adminName: String!, $password: String!) {
          AdminLogin(adminName: $adminName, password: $password) {
            token,
            admin {
              adminName
            },
            errorMessage
          }
        }
      `

      const URL = 'http://localhost:3045/graphql'
      const variables = { adminName: this.adminName, password: this.password }

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
          this.showNotification(result.errors[0].message, 'error')
        } else {
          const { token, admin, errorMessage } = result.data.AdminLogin

          if (errorMessage) {
            this.showNotification(errorMessage, 'error')
          } else {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('isAdmin', true) // Set admin flag
            this.isLoggedIn = true // Set logged in status
            this.showNotification(`Welcome back, Admin ${admin.adminName}!`)
            this.loadData() // Load surveys after login
          }
        }
      } catch (error) {
        console.error('Login error:', error)
        this.showNotification('An error occurred during login.', 'error')
      } finally {
        this.loading = false
      }
    },
    async loadData() {
      let query = this.surveyQuery
      const token = sessionStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:3045/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ query })
        })
        const result = await response.json()
        if (result.data) {
          console.log(result.data)
          this.surveys = result.data || []
        }
      } catch (error) {
        console.error('Error loading components:', error)
      }
    }
  },

  mounted() {
    this.loadData()
    this.checkAdminStatus() // Check if admin is logged in
  }
}
</script>
