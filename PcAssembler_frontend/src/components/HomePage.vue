<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>PC Assembler</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="secondary" text @click="$router.push('/home')">Home</v-btn>
      <v-btn text @click="$router.push('#builds')">PC Builds</v-btn>
      <v-btn text @click="$router.push('#partsbrowser')">Parts Browser</v-btn>
      <v-btn text @click="$router.push('#about')">About</v-btn>
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-container>
      <v-row style="margin-top: 15vh">
        <v-col>
          <v-card>
            <v-data-table :headers="headers" :items="buildSummaries">
              <template v-slot:item="{ item }">
                <tr @click="openBuildDetails(item)">
                  <td>{{ item.name }}</td>
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.cost }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="auto">
          <v-btn variant="outlined" @click="createNewBuild">Create New Build +</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Modal to show build details -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Build Details</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item-group>
              <v-list-item v-for="(item, index) in selectedBuildComponents" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ item.key }}: {{ item.component.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="tonal" color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      headers: [
        { title: 'PC Build Name', value: 'name' },
        { title: 'Build Date', value: 'createdAt' },
        { title: 'Cost Estimate', value: 'cost' }
      ],
      buildSummaries: [],
      dialog: false,
      selectedBuildComponents: [],
      tab:null,
      totalCost: 0,
      formattedDate: ''
    }
  },
  methods: {
    async loadBuildSummaries() {
      const getBuildMutation = `
        query {
          getBuildsByUser {
            name
            components {
              cpu { name }
              motherboard { name }
              os { name }
              memory { name }
              monitor { name }
              powerSupply { name }
              internalHardDrive { name }
              caseAccessory { name }
              thermalPaste { name }
              wirelessNetworkCard { name }
            }
            createdAt
          }
        }
      `
      const token = sessionStorage.getItem('token')
      const URL = 'http://localhost:3045/graphql'
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ query: getBuildMutation })
        })
        const result = await response.json()
        if (result.errors) {
          console.error('Error fetching builds:', result.errors)
        } else {
          this.buildSummaries = result.data.getBuildsByUser
        }
      } catch (error) {
        console.error('Builds error:', error)
        alert('An error occurred during loading builds.')
      }
    },
    openBuildDetails(item) {
      console.log(item.components)
      this.selectedBuildComponents = Object.entries(item.components)
        .map(([key, component]) => ({ key, component })) // Create an array of { key, component }
        .filter(({ component }) => component && component.name) // Filter out invalid components // filter to only show the components that exist

      this.dialog = true
    },
    createNewBuild() {
      // Functionality to create a new build
    }
  },
  mounted() {
    this.loadBuildSummaries() // Load build summaries when the component is mounted
  }
}
</script>

<style scoped></style>
