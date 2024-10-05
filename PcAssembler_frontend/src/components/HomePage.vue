<template>
    <div class="container">
      <div class="topnav">
        <a href="/home">Home</a>
        <a href="#builds">PC Builds</a>
        <a href="#partsbrowser">Parts Browser</a>
        <a href="#about">About</a>
        <a href="/">Logout</a>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <td>PC Build Name</td>
            <td>Build Type</td>
            <td>Build Date</td>
            <td>Build Status</td>
            <td>Cost Estimate</td>
          </tr>
        </thead>
        <!-- This is some mock data for now -->
        <tbody>
        <tr>
            <td>Test Build PC</td>
            <td>This is a Build Type</td>
            <td>April 24, 1998</td>
            <td>Complete</td>
            <td>$1420.23</td>
        </tr>
        <tr>
            <td>Test Build PC</td>
            <td>This is a Build Type</td>
            <td>April 24, 1998</td>
            <td>Complete</td>
            <td>$1420.23</td>
        </tr>
        <tr>
            <td>Test Build PC</td>
            <td>This is a Build Type</td>
            <td>April 24, 1998</td>
            <td>Complete</td>
            <td>$1420.23</td>
        </tr>
        <tr>
            <td>Test Build PC</td>
            <td>This is a Build Type</td>
            <td>April 24, 1998</td>
            <td>Complete</td>
            <td>$1420.23</td>
        </tr>
        <!-- and so on... -->
    </tbody>
      </table>
      <div class="btn-div">
        <button type="submit" class="create-button">Create New Build +</button>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'HomePage',
    data() {
      return {
        buildSummaries: [],
      }
    },
    methods: {
      // TODO: load builds / build summaries to display summary data in table
      async loadBuildSummaries() {}
    }
  }
</script>

<style scoped>
.container {
  color: white; /* White text */
  width: 100vw;
  justify-content: center;
  align-items: center;
}
.app-header {
  background-color: #657382;
  width: 100%;
  height: 7vh;
  margin-bottom: 50px;
}
.login-form {
  background: linear-gradient(135deg, #4b6cb7, #182848); /* Gradient background */
  padding: 50px 120px; /* Adjusted padding */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.styled-table {
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    width: 80%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border: 2px solid #009879;
    border-radius: 2px;
    margin: auto;
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.create-button {
  width: 400px;
  height: 100px;
  margin-top: 100px; /* Increased padding for button */
  background-color: #9c27b0; /* Purple background */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition:
    background-color 0.3s,
    transform 0.2s; /* Smooth hover effect */
}
.create-button:hover {
  background-color: #7b1fa2; /* Darker purple on hover */
  transform: scale(1.05); /* Slightly enlarge button */
}
.btn-div {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topnav {
  overflow: visible;
  position: relative;
  background-color: #657382;
  width: 100%;
  height: 7vh;
  margin-bottom: 50px;
  display: flex;
}
/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 35px 35px;
  text-decoration: none;
  font-size: 22px;
}
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

</style>