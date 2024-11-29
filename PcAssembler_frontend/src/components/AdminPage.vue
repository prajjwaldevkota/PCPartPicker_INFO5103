<template>
    <v-app>
      <v-container>
        <v-card class="pa-4 mt-12">
          <div class="pa-4 text-h4">Admin Dashboard</div>
          <div class="mt-12 pa-4 text-h5">User Feedback for Website</div>
          <v-row>
            <v-col v-for="survey in surveys" :key="survey._id" cols="12" md="6" lg="8">
              <v-card class="h-100">
                <v-card-text>
                  <div class="pa-4 text-h6">Total Feedback Count: {{ survey.numTotalFeedback }}</div>
                  <div class="pa-4 text-h6">Number of Amazing Ratings: {{ survey.numAmazing }}</div>
                  <div class="pa-4 text-h6">Number of Good Ratings: {{ survey.numGood }}</div>
                  <div class="pa-4 text-h6">Number of Ok Ratings: {{ survey.numOk }}</div>
                  <div class="pa-4 text-h6">Number of Bad Ratings: {{ survey.numBad }}</div>
                  <div class="pa-4 text-h6">Number of Awful Ratings: {{ survey.numAweful }}</div>
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
        surveys: [],
        surveyQuery: `query {
        getUserSurvey {    
              numTotalFeedback,
              numAmazing,
              numGood,
              numOk,
              numBad,
              numAweful,  
            }
        }`,
      }
    },
    methods: {
      async loadData() {
        let query = this.surveyQuery
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
            console.log(result.data)
            this.surveys = result.data || []
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