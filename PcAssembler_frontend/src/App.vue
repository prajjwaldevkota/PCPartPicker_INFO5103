<template>
  <div id="app">
    <v-app>
      <v-app-bar>
        <v-toolbar-title>PC Assembler Parts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          :color="$route.path === '/home' ? 'secondary' : 'white'"
          text
          @click="$router.push('/home')"
          >Home</v-btn
        >
        <v-btn
          :color="$route.path === '/guide' ? 'secondary' : 'white'"
          text
          @click="$router.push('/guide')"
          >Guide</v-btn
        >
        <v-btn
          :color="$route.path === '/partsbrowser' ? 'secondary' : 'white'"
          text
          @click="$router.push('/partsbrowser')"
          >Parts Browser</v-btn
        >
        <v-btn
          :color="$route.path === '/partreviews' ? 'secondary' : 'white'"
          text
          @click="$router.push('/partreviews')"
          >Part Reviews</v-btn
        >
        <v-btn
          :color="$route.path === '/about' ? 'secondary' : 'white'"
          text
          @click="$router.push('/about')"
          >About</v-btn
        >
        <!-- <v-btn
          :color="$route.path === '/admin' ? 'secondary' : 'white'"
          text
          @click="$router.push('/admin')"
          >Admin</v-btn 
        > -->
        <v-btn :color="$route.path === '/cart' ? 'secondary' : 'white'" icon @click="goToCart">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </v-app-bar>
      <router-view />

      <v-dialog v-model="showLogoutModal" max-width="400">
        <v-card>
          <v-card-title class="text-center">Thanks for visiting! Please give us your feedback</v-card-title>
          <v-card-text>
            <div v-if="!submitted" class="text-center">
              <h3 class="mb-4">How was your experience?</h3>
              <v-btn
                v-for="(reaction, index) in reactions"
                :key="index"
                @click="handleReactionClick(reaction)"
              >
                {{ reaction.emoji }}
              </v-btn>

              <v-btn
                v-if="selectedReaction"
                color="primary"
                block
                class="mt-4"
                @click="submitFeedback"
              >
                Submit Feedback
              </v-btn>
            </div>
            <div v-else class="text-center">
              <h3>Thank you for your feedback!</h3>
              <v-btn color="primary" class="mt-4" @click="finalizeLogout"> Close </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Snackbar for notifications -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000" location="top">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="snackbar.show = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import { showSnackbar, snackbar } from './snackbar'

export default {
  name: 'App',
  data() {
    return {
      snackbar,
      showLogoutModal: false,
      selectedReaction: null,
      submitted: false,
      reactions: [
        { label: 'Aweful', emoji: '😞' },
        { label: 'Bad', emoji: '😕' },
        { label: 'Ok', emoji: '😐' },
        { label: 'Good', emoji: '😊' },
        { label: 'Amazing', emoji: '😍' }
      ]
    }
  },
  methods: {
    logout() {
      if (sessionStorage.getItem('token') != null) {
        this.showLogoutModal = true
      } else {
        showSnackbar('You are not logged in', 'error')
      }
    },
    handleReactionClick(reaction) {
      this.selectedReaction = reaction
    },
    async submitFeedback() {
      try {
        const feedbackMutation = `
          mutation($label: String!) {
            addFeedback(label: $label) {
              label
            }
          }
        `

        const response = await fetch('http://localhost:3045/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: feedbackMutation,
            variables: {
              label: this.selectedReaction.label
            }
          })
        })

        await response.json()
        this.submitted = true
      } catch (error) {
        console.error('Error submitting feedback:', error)
      }
    },
    finalizeLogout() {
      sessionStorage.removeItem('token')
      showSnackbar('Successfully logged out', 'info')
      this.$router.push('/')
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style>
.v-snackbar {
  z-index: 9999;
}
</style>
