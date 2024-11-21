<template>
  <div id="app">
    <v-app>
      <v-app-bar>
        <v-toolbar-title>PC Assembler Parts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :color="$route.path === '/home' ? 'secondary' : 'white'" text @click="$router.push('/home')">Home</v-btn>
        <v-btn :color="$route.path === '/guide' ? 'secondary' : 'white'" text @click="$router.push('/guide')">Guide</v-btn>
        <v-btn :color="$route.path === '/partsbrowser' ? 'secondary' : 'white'" text @click="$router.push('/partsbrowser')">Parts Browser</v-btn>
        <v-btn :color="$route.path === '/partreviews' ? 'secondary' : 'white'" text @click="$router.push('/partreviews')">Part Reviews</v-btn>
        <v-btn :color="$route.path === '/about' ? 'secondary' : 'white'" text @click="$router.push('/about')">About</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </v-app-bar>
      
      <router-view />

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
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
    
    logout() {
      if(sessionStorage.getItem('token')!=null) {
        sessionStorage.removeItem('token'); 
        this.showNotification('Successfully logged out', 'info');
      }else{
        this.showNotification('You are not logged in', 'error');
      }
        setTimeout(() => {
        this.$router.push('/');
      }, 1000);
    }
  }
};
</script>

<style>
.v-snackbar {
  z-index: 9999;
}
</style>