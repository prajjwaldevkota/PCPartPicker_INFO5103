<template>
    <v-app>
      <v-container>
        <v-card class="pa-4 mt-12">
          <v-card-title>Create Review</v-card-title>
          <v-form @submit.prevent="saveReview" class="mt-6">
            <v-select
              v-model="selectedComponents.componentType"
              @update:modelValue="onSelectComponentType"
              :items="componentTypes"
              item-title="name"
              return-object
              label="Part Type"
            ></v-select>
            <v-select
              v-if="componentList"
              v-model="selectedComponents.component"
              :items="componentList"
              item-title="name"
              return-object
              label="Select Part"
              filterable
            ></v-select>
            <v-text-field
              v-if="selectedComponents.component"
              v-model="reviewDescription"
              label="Review Description"
              required
            ></v-text-field>
            <v-rating
              v-if="selectedComponents.component"
              v-model="rating"
              hover
              :length="5"
              :size="32"
              active-color="primary"
            />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" type="submit">Save Review</v-btn>
            </v-card-actions>
          </v-form>
          <v-card-title>Part Reviews</v-card-title>
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
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'PartReviews',
    data() {
      return {
        reviews: [],
        reviewDescription: "",
        rating: 0,
        componentTypes: [
          {name: "CPU", value: "cpu"},
          {name: "Motherboard", value: "motherboard"},
          {name: "RAM", value: "ram"},
          {name: "Monitor", value: "monitor"},
          {name: "Power Supply", value: "psu"},
          {name: "Storage", value: "storage"},
          {name: "Case Accessories", value: "accessories"},
          {name: "Thermal Paste", value: "thermal paste"},
          {name: "Wireless Network Card", value: "wireless network card"},
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

      onSelectComponentType(selectedType) {
        let dataSource = ''
        
        switch (selectedType.value) {
          case "cpu": 
            dataSource = 'getCpus'; 
            break;
          case "motherboard": 
            dataSource = 'getMotherboard'; 
            break;
          case "ram":
            dataSource = 'getMemory'; 
            break;
          case "monitor":
            dataSource = 'getMonitor'; 
            break;
          case "psu":
            dataSource = 'getPowerSupply'; 
            break;
          case "storage":
            dataSource = 'getInternalHardDrive';
            break;
          case "accessories":
            dataSource = 'getCaseAccessories';
            break;
          case "thermal paste":
            dataSource = 'getThermalPaste'; 
            break;
          case "wireless netword card":
            dataSource = 'getWirelessNetworkCard'; 
            break;
        }

        this.loadData(dataSource)
      },
  
      async saveReview() {
        const mutation = `
          mutation CreateReview(
            $componentName: String
            $componentType: String
            $rating: Int
            $comment: String
          ) {
            createReview(
              componentName: $componentName
              componentType: $componentType
              rating: $rating
              comment: $comment
            ) {
              _id
            }
          }
        `
        const token = sessionStorage.getItem('token')
        try {
          const variables = {
            componentName: this.selectedComponents.component.name,
            componentType: this.selectedComponents.componentType.value,
            rating: this.rating,
            comment: this.reviewDescription
          }
  
          const response = await fetch('http://localhost:3045/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              query: mutation,
              variables
            })
          })
          const result = await response.json()
          if (result.data) {
            this.reviews.push({
              componentName: variables.componentName,
              componentType: variables.componentType,
              rating: variables.rating,
              comment: variables.comment
            })
          }
        } catch (error) {
          console.error('Error saving build:', error)
        }
      }
    },
    mounted() {
      this.loadData()
    }
  }
  </script>