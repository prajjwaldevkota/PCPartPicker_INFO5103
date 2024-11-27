<template>
    <v-app>
      <v-container>
        <v-card class="pa-4 mt-12">
          <div class="pa-4 text-h4">Admin Dashboard</div>
          <div class="pa-4 text-h5">Reports</div>
          <v-row>
            <v-col v-for="review in reviews" :key="review._id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-text>
                  <div class="text-h6">Review for {{ review.componentName }}</div>
                  <div>Description: {{ review.comment }}</div>
                  <div>Rating: {{ review.rating }}/5</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div class="mt-12 pa-4 text-h5">User Feedback</div>
          <v-row>
            <v-col v-for="review in reviews" :key="review._id" cols="12" md="6" lg="8">
              <v-card class="h-100">
                <v-card-text>
                  <div class="text-h6">Review for {{ review.componentName }}</div>
                  <div>Description: {{ review.comment }}</div>
                  <div>Rating: {{ review.rating }}/5</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'AdminPage',
    data() {
      return {
        reviews: [],
        reviewDescription: "",
        rating: 0,
        componentTypes: [
          {name: "CPU", value: "cpu"},
          {name: "Motherboard", value: "motherboard"},
          {name: "RAM", value: "memory"},
          {name: "Monitor", value: "monitor"},
          {name: "Power Supply", value: "power-supply"},
          {name: "Storage", value: "internal-hard-drive"},
          {name: "Case Accessories", value: "case-accessory"},
          {name: "Thermal Paste", value: "thermal-paste"},
          {name: "Wireless Network Card", value: "wireless-network-card"},
        ],
        componentList: null,
        selectedComponents: {
          componentType: "",
          component: null,
        },
        newReview: {
          userId: "",
          componentName: "",
          componentType: "",
          rating: 0,
          comment: ""
        },
        reviewsQuery: `query {
          getReviews {
            _id
            userId
            componentName
            componentType
            rating
            comment
            createdAt
          }
        }`,
      }
    },
    methods: {
      async loadData(dataSource = 'getReviews') {
        let query = ''
        if (dataSource === 'getReviews') {
          query = this.reviewsQuery
        } else {
          query = `query {
             ${dataSource} {
              name
            }
          }`
        }
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
            if (query === this.reviewsQuery) {
              this.reviews = result.data[dataSource] || []
            } else {
              this.componentList = result.data[dataSource] || []
            }
          }
        } catch (error) {
          console.error('Error loading components:', error)
        }
      },
    },
    mounted() {
      this.loadData()
    }
  }
  </script>