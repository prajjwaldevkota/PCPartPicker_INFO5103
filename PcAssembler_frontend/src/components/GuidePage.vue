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

    <h1 class="guide-title">Guide</h1>

    <div class="category">
      <h2>Gaming Builds</h2>
      <div class="grid">
        <div class="tab" v-for="index in 4" :key="'gaming-' + index" @click="openModal('Gaming Build ' + index)">
          <h3>Gaming Build {{ index }}</h3>
          <img :src="`https://via.placeholder.com/150?text=Gaming+Build+${index}`" alt="Gaming Build Image" class="build-image" />
          <p class="description">Description for Gaming Build {{ index }}. This is a dummy description for the gaming build.</p>
          <p class="price">$1,299.99</p>
        </div>
      </div>
    </div>

    <div class="category">
      <h2>Streaming Builds</h2>
      <div class="grid">
        <div class="tab" v-for="index in 4" :key="'streaming-' + index" @click="openModal('Streaming Build ' + index)">
          <h3>Streaming Build {{ index }}</h3>
          <img :src="`https://via.placeholder.com/150?text=Streaming+Build+${index}`" alt="Streaming Build Image" class="build-image" />
          <p class="description">Description for Streaming Build {{ index }}. This is a dummy description for the streaming build.</p>
          <p class="price">$1,499.99</p>
        </div>
      </div>
    </div>

    <div class="category">
      <h2>Office Work Builds</h2>
      <div class="grid">
        <div class="tab" v-for="index in 4" :key="'office-' + index" @click="openModal('Office Build ' + index)">
          <h3>Office Build {{ index }}</h3>
          <img :src="`https://via.placeholder.com/150?text=Office+Build+${index}`" alt="Office Build Image" class="build-image" />
          <p class="description">Description for Office Build {{ index }}. This is a dummy description for the office work build.</p>
          <p class="price">$899.99</p>
        </div>
      </div>
    </div>

    <!-- Modal for build details -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h2>{{ modalContent.title }}</h2>
        <img :src="modalContent.image" alt="Build Image" class="modal-image" />
        <p>{{ modalContent.description }}</p>
        <ul class="parts-list">
          <li v-for="part in modalContent.parts" :key="part">{{ part }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuidePage',
  data() {
    return {
      showDropdown: false,
      isModalOpen: false,
      modalContent: {
        title: '',
        image: '',
        description: '',
        parts: [],
      },
      isSearchBarVisible: false, // New data property for search bar visibility
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleSearchBar() {
      this.isSearchBarVisible = !this.isSearchBarVisible; // Toggle the visibility of the search bar
    },
    openModal(buildName) {
      // Dummy content for the modal
      this.modalContent = {
        title: buildName,
        image: 'https://via.placeholder.com/400?text=Product+Image',
        description: 'This is a dummy description for ' + buildName + '. Here is some information about this PC build.',
        parts: [
          'Part 1: CPU',
          'Part 2: GPU',
          'Part 3: RAM',
          'Part 4: Motherboard',
          'Part 5: PSU',
          'Part 6: Case',
        ],
      };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.container {
  color: white;
  width: 100vw;
  text-align: center;
  padding-top: 600px; /* Increased padding to add more space below the navbar */
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

/* Modal content */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  width: 50%;
  max-width: 600px;
  position: relative;
  color: black;
}

/* Close button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

/* Modal image */
.modal-image {
  width: 10%;
  height: auto;
  margin-bottom: 20px;
}

/* Parts list styling */
.parts-list {
  list-style-type: none;
  padding-left: 0;
}

.parts-list li {
  margin-bottom: 10px;
  color: black;
}

/* Adjust other styles accordingly */

.build-image {
  width: 80%;
  max-width: 120px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

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

/* Grid styling */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px; /* Add margin to separate from previous elements */
}

/* Tab styling */
.tab {
  opacity: 0; /* Start invisible */
  transform: translateY(-50px); /* Start slightly above */
  background-color: #9c27b0; /* Purple background */
  border: 2px solid #7b1fa2; /* Darker purple border */
  border-radius: 8px;
  padding: 10px; /* Padding around tab */
  transition: transform 0.2s, opacity 0.6s;
  animation: slideInTab 0.8s ease-out forwards;
  animation-delay: 2.5s; /* Faster delay after headings are animated */
  position: relative; /* Position relative for price positioning */
}

.tab:hover {
  transform: scale(1.05); /* Slightly enlarge tab on hover */
}

/* Fade-in effect for the title */
.guide-title {
  opacity: 0; /* Start invisible */
  animation: fadeInTitle 1s ease-in forwards;
  animation-delay: 0.1s; /* Faster delay before the title animation starts */
}

/* Adjust the fade-in for headings */
h2 {
  opacity: 0;
  animation: fadeInHeading 1s ease-in forwards;
  animation-delay: 1.2s; /* Faster start of the headings after the Guide title */
}

/* Slide-in effect for tabs */
@keyframes slideInTab {
  0% {
    opacity: 0;
    transform: translateY(-50px); /* Start above */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* End in place */
  }
}

/* Fade-in effect for the title */
@keyframes fadeInTitle {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Fade-in for headings */
@keyframes fadeInHeading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
