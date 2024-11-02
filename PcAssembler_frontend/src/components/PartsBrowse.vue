<template>
  <v-app>
    <v-container>
      <v-app-bar>
        <v-toolbar-title>PC Assembler Parts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="$router.push('/home')">Home</v-btn>
        <v-btn text @click="$router.push('/guide')">Guide</v-btn>
        <v-btn color="secondary" text @click="$router.push('/partsbrowser')">Parts Browser</v-btn>
        <v-btn text @click="$router.push('/about')">About</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </v-app-bar>

      <v-row>
        <v-col cols="12" class="mt-15">
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

      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-text-field
            v-model="searchQuery"
            label="Search components"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <v-window v-model="activeTab">
        <v-window-item value="cpu">
          <v-row>
            <v-col v-for="cpu in filteredCPUs" :key="cpu.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ cpu.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ cpu.price }}</div>
                  <div>Core Count: {{ cpu.core_count }}</div>
                  <div>Core Clock: {{ cpu.core_clock }}GHz</div>
                  <div>Boost Clock: {{ cpu.boost_clock }}GHz</div>
                  <div>TDP: {{ cpu.tdp }}W</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
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
      searchQuery: '',
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
  computed: {
    filteredCPUs() {
      if (!this.searchQuery) return this.cpus
      const query = this.searchQuery.toLowerCase()
      
      return this.cpus.filter(cpu => 
        cpu.name.toLowerCase().includes(query)
      )
    },
    filteredMotherboards() {
      if (!this.searchQuery) return this.motherboards
      const query = this.searchQuery.toLowerCase()
      return this.motherboards.filter(mb => 
        mb.name.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
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
          this.cpus = (result.data.getCpus || []).slice(0, 50)
          this.motherboards = (result.data.getMotherboard || []).slice(0, 50)
          this.memory = (result.data.getMemory || []).slice(0, 50)
          this.os = (result.data.getOS || []).slice(0, 50)
          this.monitors = (result.data.getMonitor || []).slice(0, 50)
          this.psus = (result.data.getPowerSupply || []).slice(0, 50)
          this.storage = (result.data.getInternalHardDrive || []).slice(0, 50)
          this.cases = (result.data.getCaseAccessories || []).slice(0, 50)
          this.thermalPaste = (result.data.getThermalPaste || []).slice(0, 50)
          this.networkCards = (result.data.getWirelessNetworkCard || []).slice(0, 50)
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
