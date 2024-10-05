<template>
  <div class="welcome-container" :class="{ show: isTextVisible }">
    <h1 :class="{ fade: isFading }">Welcome to PC Assembler!</h1>
    <div class="button-group" :class="{ show: areButtonsVisible }">
      <button
        @click="login"
        :style="{ transform: areButtonsVisible ? 'translateX(0)' : 'translateX(-100%)' }"
      >
        Login
      </button>
      <button
        @click="goToSignUp"
        :style="{ transform: areButtonsVisible ? 'translateX(0)' : 'translateX(100%)' }"
      >
        Sign Up
      </button>
    </div>
    <button class="guest-button" @click="enterAsGuest" :class="{ show: isGuestButtonVisible }">
      Enter as Guest
    </button>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  data() {
    return {
      isTextVisible: false,
      isFading: false,
      areButtonsVisible: false,
      isGuestButtonVisible: false
    }
  },
  mounted() {
    this.showTextAndButtons()
  },
  methods: {
    showTextAndButtons() {
      this.isTextVisible = true // Show text
      this.isFading = true // Start fade-in effect for the text
      setTimeout(() => {
        this.isFading = false // Fade out after 1 second
        setTimeout(() => {
          this.areButtonsVisible = true // Show buttons after fade out
          this.isGuestButtonVisible = true // Show guest button
        }, 500) // Show buttons after delay
      }, 1000) // Keep the text visible for 1 second
    },
    login() {
      this.$router.push({ name: 'Login' }) // Navigate to the Login page
    },
    goToSignUp() {
      this.$router.push({ name: 'Sign Up' }) // Redirect to Signup page
    },
    enterAsGuest() {
      alert('Entering as guest...')
    }
  }
}
</script>

<style>
.welcome-container {
  margin-top: 42vh;
  text-align: center;
  opacity: 0; /* Initially hidden */
  transform: translateY(-50px); /* Start above */
  transition:
    opacity 1s ease-in-out,
    transform 1s ease-in-out; /* Animation */
}
.welcome-container.show {
  opacity: 1; /* Fade in */
  transform: translateY(0); /* Move to position */
}

h1 {
  font-size: 2.5em;
  margin: 0; /* Reset margin */
  transition: opacity 1s ease-in-out; /* Fade effect */
}
.fade {
  opacity: 0; /* Fade out */
}

.button-group {
  margin-top: 20px;
  opacity: 0; /* Initially hidden */
  transition: opacity 1s ease-in-out; /* Animation */
}
.button-group.show {
  opacity: 1; /* Fade in */
  display: flex; /* Use flexbox to align buttons */
  justify-content: center; /* Center buttons horizontally */
}
.button-group button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: #444; /* Dark button background */
  color: #fff; /* White text for buttons */
  cursor: pointer;
  border-radius: 4px;
  font-size: 1em;
  transition:
    background-color 0.3s,
    transform 0.5s ease-in-out; /* Button hover and slide animation */
}
.button-group button:hover {
  background-color: #555;
}

.guest-button {
  margin-top: 20px;
  background: none;
  color: #fff; /* White text for guest button */
  text-decoration: underline;
  border: none;
  cursor: pointer;
  font-size: 1em;
  opacity: 0; /* Initially hidden */
  transform: translateY(50px); /* Start below */
  transition:
    opacity 1s ease-in-out,
    transform 1s ease-in-out; /* Animation */
}
.guest-button.show {
  opacity: 1; /* Fade in */
  transform: translateY(0); /* Move to position */
}
</style>
