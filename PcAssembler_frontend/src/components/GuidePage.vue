<template>
  <v-app>
    <v-container>
      <!-- Building Steps Section -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title class="text-h5">Step-by-Step Building Process</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(step, index) in buildingSteps" 
                       :key="index" 
                       cols="12" 
                       md="4">
                  <v-card @click="openDialog(step)" hover>
                    <v-img
                      :src="step.image"
                      height="200"
                      cover
                    ></v-img>
                    <v-card-title>Step {{ index + 1 }}: {{ step.title }}</v-card-title>
                    <v-card-text>{{ step.shortDescription }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Component Selection Guide -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title class="text-h5">Component Selection Guide</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(guide, index) in componentGuides" 
                       :key="index" 
                       cols="12" 
                       md="4">
                  <v-card @click="openDialog(guide)" hover>
                    <v-img
                      :src="guide.image"
                      height="200"
                      cover
                    ></v-img>
                    <v-card-title>{{ guide.title }}</v-card-title>
                    <v-card-text>{{ guide.shortDescription }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Common Mistakes Section -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title class="text-h5">Common Mistakes to Avoid</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(mistake, index) in commonMistakes" 
                       :key="index" 
                       cols="12" 
                       md="4">
                  <v-card @click="openDialog(mistake)" hover>
                    <v-img
                      :src="mistake.image"
                      height="200"
                      cover
                    ></v-img>
                    <v-card-title>{{ mistake.title }}</v-card-title>
                    <v-card-text>{{ mistake.shortDescription }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Detail Dialog -->
      <v-dialog v-model="dialog" max-width="700">
        <v-card>
          <v-img
            v-if="selectedItem.image"
            :src="selectedItem.image"
            height="300"
            cover
          ></v-img>
          <v-card-title>{{ selectedItem.title }}</v-card-title>
          <v-card-text>
            <div class="text-body-1 mb-4">{{ selectedItem.fullDescription }}</div>
            <v-card v-if="selectedItem.tips" color="grey-lighten-4" class="pa-4">
              <div class="text-h6 mb-2">Pro Tips:</div>
              <v-list>
                <v-list-item v-for="(tip, index) in selectedItem.tips" 
                            :key="index" 
                            :title="tip">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-check-circle</v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'GuidePage',
  data() {
    return {
      dialog: false,
      selectedItem: {},
      buildingSteps: [
        {
          title: 'Prepare Your Workspace',
          shortDescription: 'Setting up a clean, static-free workspace',
          image: '/images/workspace-setup.jpg',
          fullDescription: 'Start with a clean, well-lit workspace. Use an anti-static mat or wristband to prevent damage to components. Ensure you have all necessary tools: screwdrivers, thermal paste, etc.',
          tips: [
            'Work on a hard, non-carpeted surface',
            'Keep your components in anti-static bags until needed',
            'Have good lighting available'
          ]
        },
        {
          title: 'Install the CPU',
          shortDescription: 'Properly installing the processor',
          image: '/images/cpu-installation.jpg',
          fullDescription: 'Carefully install the CPU into the motherboard socket. Align the golden triangle on the CPU corner with the socket triangle. Never force the CPU - it should drop in easily.',
          tips: [
            'Handle the CPU by its edges only',
            'Double-check the alignment before closing the socket',
            'Don\'t touch the gold pins or contacts'
          ]
        },
        {
          title: 'Mount the Motherboard',
          shortDescription: 'Installing the motherboard in the case',
          image: '/images/motherboard-installation.jpg',
          fullDescription: 'Install standoffs in the case, place the I/O shield, and carefully mount the motherboard. Ensure all screw holes align properly.',
          tips: [
            'Don\'t forget the I/O shield before mounting',
            'Use all required standoffs',
            'Don\'t overtighten the screws'
          ]
        }
      ],
      componentGuides: [
        {
          title: 'Choosing a CPU',
          shortDescription: 'How to select the right processor',
          image: '/images/cpu-guide.jpg',
          fullDescription: 'Your CPU choice affects overall system performance. Consider factors like core count, clock speed, and whether you\'ll be overclocking.',
          tips: [
            'Match the CPU socket to your motherboard',
            'Consider your workload requirements',
            'Check the included cooling solution'
          ]
        },
        {
          title: 'Selecting Memory',
          shortDescription: 'Choosing the right RAM configuration',
          image: '/images/ram-guide.jpg',
          fullDescription: 'RAM selection impacts system responsiveness and multitasking capability. Consider speed, capacity, and compatibility.',
          tips: [
            'Check motherboard compatibility',
            'Consider dual-channel configuration',
            'Verify speed support with CPU'
          ]
        }
      ],
      commonMistakes: [
        {
          title: 'Forgetting I/O Shield',
          shortDescription: 'Don\'t forget to install the I/O shield first',
          image: '/images/io-shield.jpg',
          fullDescription: 'One of the most common mistakes is forgetting to install the I/O shield before mounting the motherboard. This requires removing the entire motherboard to fix.',
          tips: [
            'Install I/O shield before anything else',
            'Ensure it clicks into place properly',
            'Check all edges are properly seated'
          ]
        }
      ]
    }
  },
  methods: {
    openDialog(item) {
      this.selectedItem = item
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>