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
      <v-row style="margin-top:15vh;">
        <v-col>
          <v-card>
            <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
              <v-tab :value="1">Gaming Builds</v-tab>
              <v-tab :value="2">Streaming Builds</v-tab>
              <v-tab :value="3">Budget Builds</v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
              <v-tabs-window-item v-for="n in 3" :key="n" :value="n">
                <v-container fluid>
                  <v-row>
                    <v-col v-for="i in 6" :key="i" cols="12" md="4">
                      <v-img
                        :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                        :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                        height="205"
                        cover
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn variant="outlined" @click="createNewBuild"> Create New Build + </v-btn>
        </v-col>
        </v-row>
    </v-container>

    <!--<v-table :headers="headers" :items="buildSummaries"></v-table>-->

    
  </v-app>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      headers: [
        { text: 'PC Build Name', value: 'name' },
        { text: 'Build Type', value: 'type' },
        { text: 'Build Date', value: 'date' },
        { text: 'Build Status', value: 'status' },
        { text: 'Cost Estimate', value: 'cost' }
      ],
      buildSummaries: [
        {
          name: 'Test Build PC',
          type: 'This is a Build Type',
          date: 'April 24, 1998',
          status: 'Complete',
          cost: '$1420.23'
        },
        {
          name: 'Test Build PC',
          type: 'This is a Build Type',
          date: 'April 24, 1998',
          status: 'Complete',
          cost: '$1420.23'
        }
      ],
      tab:null,
    }
  },
  methods: {
    // TODO: load builds / build summaries to display summary data in table
    async loadBuildSummaries() {}
  }
}
</script>

<style></style>
