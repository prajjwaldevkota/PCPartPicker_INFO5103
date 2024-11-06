<template>
  <v-app>
    <v-container>
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

        <v-window-item value="motherboard">
          <v-row>
            <v-col v-for="mb in filteredMotherboards" :key="mb.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ mb.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ mb.price }}</div>
                  <div>Socket: {{ mb.socket }}</div>
                  <div>Form Factor: {{ mb.form_factor }}</div>
                  <div>Max Memory: {{ mb.max_memory }}GB</div>
                  <div>Memory Slots: {{ mb.memory_slots }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="memory">
          <v-row>
            <v-col v-for="ram in filteredMemory" :key="ram.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ ram.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ ram.price }}</div>
                  <div>Speed: {{ ram.speed }} MHz</div>
                  <div>Modules: {{ ram.modules }}</div>
                  <div>CAS Latency: {{ ram.cas_latency }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="storage">
          <v-row>
            <v-col v-for="hdd in filteredStorage" :key="hdd.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ hdd.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ hdd.price }}</div>
                  <div>Capacity: {{ hdd.capacity }} MHz</div>
                  <div>Type: {{ hdd.type }}</div>
                  <div>Interface: {{ hdd.interface }}</div>
                  <div>Cache: {{ hdd.cache }}</div>
                  <div>Form Factor: {{ hdd.form_factor }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="psu">
          <v-row>
            <v-col v-for="psu in filteredPSUs" :key="psu.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ psu.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ psu.price }}</div>
                  <div>Type: {{ psu.type }}</div>
                  <div>Efficiency: {{ psu.efficiency }}</div>
                  <div>Wattage: {{ psu.wattage }}</div>
                  <div>Modular: {{ psu.modular }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="monitor">
          <v-row>
            <v-col v-for="monitor in filteredMonitors" :key="monitor.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ monitor.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ monitor.price }}</div>
                  <div>Screen Size: {{ monitor.screen_size }}</div>
                  <div>Resolution: {{ monitor.resolution }}</div>
                  <div>Refresh Rate: {{ monitor.refresh_rate }}</div>
                  <div>Response Time: {{ monitor.response_time }}</div>
                  <div>Panel Type: {{ monitor.panel_type }}</div>
                  <div>Aspect Ratio: {{  monitor.aspect_ratio }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="os">
          <v-row>
            <v-col v-for="os in filteredOS" :key="os.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ os.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ os.price }}</div>
                  <div>Mode: {{ os.mode }}</div>
                  <div>Max Memory: {{ os.max_memory }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="case">
          <v-row>
            <v-col v-for="pcCase in filteredCases" :key="pcCase.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ pcCase.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ pcCase.price }}</div>
                  <div>Type: {{ pcCase.type }}</div>
                  <div>Form Factor: {{  pcCase.form_factor }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="thermal">
          <v-row>
            <v-col v-for="tpaste in filteredThermalPaste" :key="tpaste.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ tpaste.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ tpaste.price }}</div>
                  <div>Amount: {{ tpaste.amount }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="network">
          <v-row>
            <v-col v-for="card in filteredNetworkCards" :key="card.id" cols="12" md="6" lg="4">
              <v-card class="h-100">
                <v-card-title class="text-h6">{{ card.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ card.price }}</div>
                  <div>Protocol: {{ card.protocol }}</div>
                  <div>Interface: {{  card.interface }}</div>
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
      return this.filterParts(this.cpus)
    },
    filteredMotherboards() {
      return this.filterParts(this.motherboards)
    },
    filteredMemory() {
      return this.filterParts(this.memory)
    },
    filteredStorage() {
      return this.filterParts(this.storage)
    },
    filteredPSUs() {
      return this.filterParts(this.psus)
    },
    filteredMonitors() {
      return this.filterParts(this.monitors)
    },
    filteredOS() {
      return this.filterParts(this.os)
    },
    filteredCases() {
      return this.filterParts(this.cases)
    },
    filteredThermalPaste() {
      return this.filterParts(this.thermalPaste)
    },
    filteredNetworkCards() {
      return this.filterParts(this.networkCards)
    }
  },
  methods: {
    filterParts(parts) {
      if (!this.searchQuery) return parts
      const query = this.searchQuery.toLowerCase()
      return parts.filter((part) => part.name.toLowerCase().includes(query))
    },

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
