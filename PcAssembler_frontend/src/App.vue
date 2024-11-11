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
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      this.$router.push('/');
      alert('You are being logged out.');
    }
}
};
</script>

<style>
</style>