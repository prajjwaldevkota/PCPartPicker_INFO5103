<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title class="text-h4 py-4">PC Parts Browser</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-tabs v-model="activeTab" color="primary" align-tabs="center">
            <v-tab value="cpu">CPUs</v-tab>
            <v-tab value="motherboard">Motherboards</v-tab>
            <v-tab value="memory">Memory</v-tab>
            <v-tab value="storage">Storage</v-tab>
            <v-tab value="psu">Power Supplies</v-tab>
            <v-tab value="monitor">Monitors</v-tab>
            <v-tab value="os">Operating Systems</v-tab>
            <v-tab value="case">Cases</v-tab>
            <v-tab value="thermal">Thermal Paste</v-tab>
            <v-tab value="network">Network Cards</v-tab>
          </v-tabs>
        </v-col>
      </v-row>

      <!-- Component Type Selection -->
      <v-window v-model="activeTab">
        <!-- CPU Tab -->
        <v-window-item value="cpu">
          <v-row>
            <v-col v-for="cpu in cpus" :key="cpu.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ cpu.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ cpu.price }}</div>
                  <div>Core Count: {{ cpu.core_count }}</div>
                  <div>Core Count: {{ cpu.core_count }}</div>
                  <div>Core Clock: {{ cpu.core_clock }}GHz</div>
                  <div>Boost Clock: {{ cpu.boost_clock }}GHz</div>
                  <div>TDP: {{ cpu.tdp }}W</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Motherboard Tab -->
        <v-window-item value="motherboard">
          <v-row>
            <v-col v-for="mb in motherboards" :key="mb.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ mb.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ mb.price }}</div>
                  <div>Socket: {{ mb.socket }}</div>
                  <div>Form Factor: {{ mb.form_factor }}</div>
                  <div>Memory Slots: {{ mb.memory_slots }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Add similar simplified versions for other components -->
      </v-window>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'PartsBrowse',
  data() {
    return {
      activeTab: 'cpu',
      cpus: [],
      motherboards: [],
      memory: [],
      storage: [],
      psus: [],
      monitors: [],
      os: [],
      cases: [],
      thermalPaste: [],
      networkCards: []
    }
  },
  methods: {
    async loadComponents() {
      const query = `
          query {
            getCpus {
              name
              price
              core_clock
              core_count
              boost_clock
              tdp
              graphics
              smt
            }
            getMotherboard {
              name
              price
              socket
              form_factor
              max_memory
              memory_slots
              color
            }
            getOS {
              name
              price
              mode
              max_memory
            }
            getMemory {
              name
              price
              speed
              modules
              color
              first_word_latency
              cas_latency
            }
            getMonitor {
              name
              price
              screen_size
              resolution
              refresh_rate
              response_time
              panel_type
              aspect_ratio
            }
            getPowerSupply {
              name
              price
              type
              efficiency
              wattage
              modular
              color
            }
            getInternalHardDrive {
              name
              price
              capacity
              type
              interface
              cache
              form_factor
            }
            getCaseAccessories {
              name
              price
              type
              form_factor
            }
            getThermalPaste {
              name
              price
              amount
            }
            getWirelessNetworkCard {
              name
              price
              protocol
              interface
              color
            }
          }
        `
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
          this.cpus = result.data.getCpus || []
          this.motherboards = result.data.getMotherboard || []
          this.memory = result.data.getMemory || []
        }
      } catch (error) {
        console.error('Error loading components:', error)
      }
    }
  },
  mounted() {
    this.loadComponents()
  }
}
</script>

<style>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}

.h-100 {
  height: 100%;
}
</style>
