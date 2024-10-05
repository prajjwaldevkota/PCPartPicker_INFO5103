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
  width: 100%;
  background-color: #2c3135; /* Black background */
  color: #fff; /* White text */
  display: flex;
  justify-content: center;
}
</style>