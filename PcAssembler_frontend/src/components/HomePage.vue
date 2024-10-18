<template>
    <div class="container">
    <div class="topnav">
      <div class="nav-buttons">
        <a href="/home">Home</a>
        <div class="dropdown">
          <button class="dropbtn" @click="toggleDropdown">Products</button>
          <div class="dropdown-content" v-show="showDropdown">
            <table class="dropdown-table">
              <thead>
                <tr>
                  <th>Main Components</th>
                  <th>Peripherals</th>
                  <th>Displays</th>
                  <th>Software</th>
                  <th>Fans</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="#">Dummy Product 1</a></td>
                  <td><a href="#">Dummy Product 4</a></td>
                  <td><a href="#">Dummy Product 6</a></td>
                  <td><a href="#">Dummy Product 7</a></td>
                  <td><a href="#">Dummy Product 8</a></td>
                </tr>
                <tr>
                  <td><a href="#">Dummy Product 2</a></td>
                  <td><a href="#">Dummy Product 5</a></td>
                  <td></td>
                  <td></td>
                  <td><a href="#">Dummy Product 9</a></td>
                </tr>
                <tr>
                  <td><a href="#">Dummy Product 3</a></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <a href="#Builders">Builder</a>
        <a href="/guide">Guide</a>
        <a href="#Builds">Builds</a>
        <a href="/">Logout</a>
      </div>
      <div class="search-bar">
        <button class="search-icon" @click="toggleSearchBar">
          <i class="fas fa-search"></i>
        </button>
        <input v-if="isSearchBarVisible" type="text" placeholder="Search..." class="search-input" @blur="isSearchBarVisible = false" />
      </div>
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
      <tbody>
        <tr>
          <td>Test Build PC</td>
          <td>This is a Build Type</td>
          <td>April 24, 1998</td>
          <td>Complete</td>
          <td>$1420.23</td>
        </tr>
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
      showDropdown: false,
      isSearchBarVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleSearchBar() {
      this.isSearchBarVisible = !this.isSearchBarVisible;
    },
  },
};
</script>

<style scoped>
/* Top navigation bar styling */
.topnav {
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between; /* This will separate left and right aligned items */
  align-items: center;
  padding: 14px 20px;
  z-index: 1000;
}
/* General button styles */
.topnav a, .dropbtn {
  color: white;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 1.2em;
  display: inline-block;
}

.topnav a:hover, .dropbtn:hover {
  background-color: #ddd;
  color: black;
}

/* Search bar styling */
.search-bar {
  display: flex;
  align-items: center;
  position: relative; /* Needed for absolute positioning of the search input */
}

.search-icon {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5em; /* Increased size for visibility */
}

/* Search input styling */
.search-input {
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  transition: all 0.3s ease; /* Smooth transition */
  visibility: visible; /* Make it visible */
  height: 40px; /* Set height for the input */
  width: 200px; /* Set a default width for the input */
}

.search-input[placeholder]:focus {
  visibility: visible; /* Keep it visible when focused */
}

/* Dropdown container */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #333;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #333;
  min-width: 400px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content {
  display: block;
}

.dropdown-table {
  width: 100%;
  border-collapse: collapse;
}

.dropdown-table th {
  background-color: #9c27b0;
  color: white;
  padding: 10px;
  text-align: left;
}

.dropdown-table td {
  background-color: #444;
  color: white;
  padding: 8px;
  border-bottom: 1px solid #555;
}

.dropdown-table td a {
  color: white;
  text-decoration: none;
}

.dropdown-table td a:hover {
  text-decoration: underline;
}

/* Table styling */
.styled-table {
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 80%;
  margin: 50px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border: 2px solid #009879;
  border-radius: 5px;
}

.styled-table thead tr {
  background-color: #009879;
  color: white;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
}

/* Search bar styling */
.search-bar {
  display: flex;
  align-items: center;
  position: relative; /* Needed for absolute positioning of the search input */
}

.search-icon {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5em; /* Increased size for visibility */
}

/* Search input styling */
.search-input {
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  transition: all 0.3s ease; /* Smooth transition */
  visibility: visible; /* Make it visible */
  height: 40px; /* Set height for the input */
  width: 200px; /* Set a default width for the input */
}

/* Additional styles (unchanged) */
.create-button {
  width: 200px;
  padding: 10px;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
}

.create-button:hover {
  background-color: #7b1fa2;
  transform: scale(1.05);
}

.btn-div {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
