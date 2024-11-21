<template>
  <v-app>
    <v-container>
      <!-- Building Steps Section -->
      <v-row>
        <v-col cols="12">
          <v-card class="mt-12 mb-6">
            <v-card-title class="text-h5">Step-by-Step Building Process</v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="(step, index) in buildingSteps" :key="index" cols="12" md="4">
                  <v-card @click="openDialog(step)" hover>
                    <v-img :src="step.image" height="200" cover></v-img>
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
                <v-col v-for="(guide, index) in componentGuides" :key="index" cols="12" md="4">
                  <v-card @click="openDialog(guide)" hover>
                    <v-img :src="guide.image" height="200" cover></v-img>
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
                <v-col v-for="(mistake, index) in commonMistakes" :key="index" cols="12" md="4">
                  <v-card @click="openDialog(mistake)" hover>
                    <v-img :src="mistake.image" height="200" cover></v-img>
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
          <v-img v-if="selectedItem.image" :src="selectedItem.image" height="300" cover></v-img>
          <v-card-title>{{ selectedItem.title }}</v-card-title>
          <v-card-text>
            <div class="text-body-1 mb-4">{{ selectedItem.fullDescription }}</div>
            <v-card v-if="selectedItem.tips" color="grey-lighten-4" class="pa-4">
              <div class="text-h6 mb-2">Pro Tips:</div>
              <v-list>
                <v-list-item v-for="(tip, index) in selectedItem.tips" :key="index" :title="tip">
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
import cpuInstallImage from '../assets/images/cpu-installation.jpg'
import ioShieldImage from '../assets/images/io-shield.jpg'
import workspaceSetupImage from '../assets/images/workspace-setup.jpg'
import motherboardInstallationImage from '../assets/images/motherboard-installation.jpg'
import cpuGuideImage from '../assets/images/cpu-guide.jpg'
import ramGuideImage from '../assets/images/ram.jpg'
import gpuGuideImage from '../assets/images/gpu.jpg'
import thermalPasteImage from '../assets/images/thermalpaste.jpg'
import ramInstallImage from '../assets/images/improperram.jpg'
import psuMistakeImage from '../assets/images/psu-mistake.jpg'
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
          image: workspaceSetupImage,
          fullDescription:
            'Start with a clean, well-lit workspace. Use an anti-static mat or wristband to prevent damage to components. Ensure you have all necessary tools: screwdrivers, thermal paste, etc.',
          tips: [
            'Work on a hard, non-carpeted surface',
            'Keep your components in anti-static bags until needed',
            'Have good lighting available'
          ]
        },
        {
          title: 'Install the CPU',
          shortDescription: 'Properly installing the processor',
          image: cpuInstallImage,
          fullDescription:
            'Carefully install the CPU into the motherboard socket. Align the golden triangle on the CPU corner with the socket triangle. Never force the CPU - it should drop in easily.',
          tips: [
            'Handle the CPU by its edges only',
            'Double-check the alignment before closing the socket',
            "Don't touch the gold pins or contacts"
          ]
        },
        {
          title: 'Mount the Motherboard',
          shortDescription: 'Installing the motherboard in the case',
          image: motherboardInstallationImage,
          fullDescription:
            'Install standoffs in the case, place the I/O shield, and carefully mount the motherboard. Ensure all screw holes align properly.',
          tips: [
            "Don't forget the I/O shield before mounting",
            'Use all required standoffs',
            "Don't overtighten the screws"
          ]
        }
      ],
      componentGuides: [
        {
          title: 'Choosing a CPU',
          shortDescription: 'How to select the right processor',
          image: cpuGuideImage,
          fullDescription:
            "Your CPU choice affects overall system performance. Consider factors like core count, clock speed, and whether you'll be overclocking.",
          tips: [
            'Match the CPU socket to your motherboard',
            'Consider your workload requirements',
            'Check the included cooling solution'
          ]
        },
        {
          title: 'Selecting Memory',
          shortDescription: 'Choosing the right RAM configuration',
          image: ramGuideImage,
          fullDescription:
            'RAM selection impacts system responsiveness and multitasking capability. Consider speed, capacity, and compatibility.',
          tips: [
            'Check motherboard compatibility',
            'Consider dual-channel configuration',
            'Verify speed support with CPU'
          ]
        },
        {
          title: 'Graphics Card Selection',
          shortDescription: 'Choosing the right GPU for your needs',
          image: gpuGuideImage,
          fullDescription:
            'The graphics card is crucial for gaming and content creation. Consider factors like resolution, refresh rate, VRAM, and power requirements.',
          tips: [
            'Check your power supply can handle the GPU',
            'Measure your case for physical fit',
            "Consider your monitor's resolution and refresh rate",
            'Look at benchmarks for games you plan to play'
          ]
        }
      ],
      commonMistakes: [
        {
          title: 'Forgetting I/O Shield',
          shortDescription: "Don't forget to install the I/O shield first",
          image: ioShieldImage,
          fullDescription:
            'One of the most common mistakes is forgetting to install the I/O shield before mounting the motherboard. This requires removing the entire motherboard to fix.',
          tips: [
            'Install I/O shield before anything else',
            'Ensure it clicks into place properly',
            'Check all edges are properly seated'
          ]
        },
        {
          title: 'Improper RAM Installation',
          shortDescription: 'Not seating RAM modules correctly',
          image: ramInstallImage,
          fullDescription:
            "RAM modules need to be firmly seated with both clips locked. Many first-time builders don't push hard enough, leading to boot failures. Also, using wrong slots can disable dual-channel mode.",
          tips: [
            'Insert RAM until both clips snap',
            'Check your motherboard manual for correct slot order',
            'Align the notch carefully before insertion'
          ]
        },
        {
          title: 'Power Supply Mistakes',
          shortDescription: 'Common PSU installation errors',
          image: psuMistakeImage,
          fullDescription:
            'Power supply errors can be catastrophic. Common mistakes include forgetting to flip the PSU switch, not connecting all necessary power cables, or using modular cables from different PSU brands.',
          tips: [
            'Connect BOTH CPU power and motherboard power',
            'Never mix modular cables from different PSUs',
            'Ensure proper airflow orientation'
          ]
        },
        {
          title: 'Thermal Paste Application',
          shortDescription: 'Using too much or too little thermal paste',
          image: thermalPasteImage,
          fullDescription:
            "Incorrect thermal paste application can lead to poor CPU cooling. Too much paste can spill onto the motherboard, while too little won't provide adequate heat transfer.",
          tips: [
            'Use about a pea-sized amount for most CPUs',
            'Clean old paste completely before reapplication',
            "Don't spread the paste manually"
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
