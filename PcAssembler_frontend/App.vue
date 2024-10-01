<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
