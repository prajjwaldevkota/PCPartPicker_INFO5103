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
              <v-card @click="openModal(cpu)" class="h-100">
                <v-card-title class="text-h6">{{ cpu.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ cpu.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="motherboard">
          <v-row>
            <v-col v-for="mb in filteredMotherboards" :key="mb.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(mb)" class="h-100">
                <v-card-title class="text-h6">{{ mb.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ mb.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="memory">
          <v-row>
            <v-col v-for="ram in filteredMemory" :key="ram.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(ram)" class="h-100">
                <v-card-title class="text-h6">{{ ram.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ ram.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="storage">
          <v-row>
            <v-col v-for="hdd in filteredStorage" :key="hdd.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(hdd)" class="h-100">
                <v-card-title class="text-h6">{{ hdd.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ hdd.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="psu">
          <v-row>
            <v-col v-for="psu in filteredPSUs" :key="psu.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(psu)" class="h-100">
                <v-card-title class="text-h6">{{ psu.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ psu.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="monitor">
          <v-row>
            <v-col v-for="monitor in filteredMonitors" :key="monitor.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(monitor)" class="h-100">
                <v-card-title class="text-h6">{{ monitor.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ monitor.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="os">
          <v-row>
            <v-col v-for="os in filteredOS" :key="os.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(os)" class="h-100">
                <v-card-title class="text-h6">{{ os.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ os.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="case">
          <v-row>
            <v-col v-for="pcCase in filteredCases" :key="pcCase.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(pcCase)" class="h-100">
                <v-card-title class="text-h6">{{ pcCase.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ pcCase.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="thermal">
          <v-row>
            <v-col v-for="tpaste in filteredThermalPaste" :key="tpaste.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(tpaste)" class="h-100">
                <v-card-title class="text-h6">{{ tpaste.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ tpaste.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="network">
          <v-row>
            <v-col v-for="card in filteredNetworkCards" :key="card.id" cols="12" md="6" lg="4">
              <v-card @click="openModal(card)" class="h-100">
                <v-card-title class="text-h6">{{ card.name }}</v-card-title>
                <v-card-text>
                  <div>Price: ${{ card.price }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
      <v-dialog v-model="modalVisible" max-width="600px">
        <v-card>
          <v-card-title class="headline">{{
            selectedPart ? selectedPart.name : 'Part Details'
          }}</v-card-title>
          <v-card-text>
            <div v-if="selectedPart">
              <div v-if="selectedPart.price">Price: ${{ selectedPart.price }}</div>
              <div v-if="selectedPart.core_count">Core Count: {{ selectedPart.core_count }}</div>
              <div v-if="selectedPart.core_clock">Core Clock: {{ selectedPart.core_clock }}GHz</div>
              <div v-if="selectedPart.boost_clock">
                Boost Clock: {{ selectedPart.boost_clock }}GHz
              </div>
              <div v-if="selectedPart.tdp">TDP: {{ selectedPart.tdp }}W</div>
              <div v-if="selectedPart.graphics">Graphics: {{ selectedPart.graphics }}</div>
              <div v-if="selectedPart.smt !== undefined">
                SMT: {{ selectedPart.smt ? 'Enabled' : 'Disabled' }}
              </div>
              <div v-if="selectedPart.socket">Socket Type: {{ selectedPart.socket }}</div>
              <div v-if="selectedPart.max_memory">Max Memory: {{ selectedPart.max_memory }} GB</div>
              <div v-if="selectedPart.memory_slots">
                Memory Slots: {{ selectedPart.memory_slots }}
              </div>
              <div v-if="selectedPart.speed">Memory Speed: {{ selectedPart.speed[1] }} MHz</div>
              <div v-if="selectedPart.modules">
                Modules: {{ selectedPart.modules[0] }} x {{ selectedPart.modules[1] }} GB
              </div>
              <div v-if="selectedPart.cas_latency">CAS Latency: {{ selectedPart.cas_latency }}</div>
              <div v-if="selectedPart.color">Color: {{ selectedPart.color }}</div>
              <div v-if="selectedPart.efficiency">Efficiency: {{ selectedPart.efficiency }}</div>
              <div v-if="selectedPart.wattage">Wattage: {{ selectedPart.wattage }}W</div>
              <div v-if="selectedPart.modular">Modular: {{ selectedPart.modular }}</div>
              <div v-if="selectedPart.screen_size">
                Screen Size: {{ selectedPart.screen_size }} inches
              </div>
              <div v-if="selectedPart.resolution">
                Resolution: {{ selectedPart.resolution[0] }}x{{ selectedPart.resolution[1] }}
              </div>
              <div v-if="selectedPart.refresh_rate">
                Refresh Rate: {{ selectedPart.refresh_rate }} Hz
              </div>
              <div v-if="selectedPart.response_time">
                Response Time: {{ selectedPart.response_time }} ms
              </div>
              <div v-if="selectedPart.panel_type">Panel Type: {{ selectedPart.panel_type }}</div>
              <div v-if="selectedPart.aspect_ratio">
                Aspect Ratio: {{ selectedPart.aspect_ratio }}
              </div>
              <div v-if="selectedPart.mode">Mode: {{ selectedPart.mode }}-bit</div>
              <div v-if="selectedPart.amount">Amount: {{ selectedPart.amount }} g</div>
              <div v-if="selectedPart.protocol">Protocol: {{ selectedPart.protocol }}</div>
              <div v-if="selectedPart.capacity">Capacity: {{ selectedPart.capacity }} GB</div>
              <div v-if="selectedPart.price_per_gb">
                Price per GB: ${{ selectedPart.price_per_gb }}
              </div>
              <div v-if="selectedPart.type">Type: {{ selectedPart.type }}</div>
              <div v-if="selectedPart.cache">Cache: {{ selectedPart.cache }} MB</div>
              <div v-if="selectedPart.form_factor">Form Factor: {{ selectedPart.form_factor }}</div>
              <div v-if="selectedPart.interface">Interface: {{ selectedPart.interface }}</div>
            </div>
                              
                  <div style="margin-top: 20px;"><hr width="100%" size="2"></div>
                      <div style="margin-top: 20px;"><h2>Buy options</h2></div>
                      
                    <div style="margin-top: 10px;">
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                          <span style="margin-right: 400px;">Amazon</span>
                          <a href="https://www.amazon.com/AMD-Ryzen-7800X3D-16-Thread-Processor/dp/B0BTZB7F88/ref=sr_1_1?crid=2B0YN6L3MNUYD&dib=eyJ2IjoiMSJ9.hs8ZjhfxdFhr2YEgR9IZ3EyJThZ48gUK_JYeMoDUIrCdIKT6va3SLzddG4IHMQJ9NyFJvaOE8XhCQsJCQKRrtm_UP3i8cbY2Ro3XNc8GjAyekROej_VKrYX9jzXKW_QoyPF6c0XX1Q_5u1plrGbDZKPFa87d1UlkCjQWNrkLlg7ijGg0lIDn1RWepOh6CFolIbG1nEHgByUBLLJFcON_FhnmkzmkiFpLMH6LLbQkBHs.CMtogptoGEUuzVF0RJIcIwiIw62Xz-7TUvlH5_hIZfU&dib_tag=se&keywords=AMD+Ryzen+7+7800X3D&qid=1732417237&sprefix=amd+ryzen+7+7800x3d%2Caps%2C100&sr=8-1" target="_blank"><button class="buy-button">Buy</button></a>
                    </div>
                      
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                          <span style="margin-right: 400px;">Newegg</span>
                          <a href="https://www.newegg.com" target="_blank"><button class="buy-button">Buy</button></a>
                    </div>
                      
                    <div style="display: flex; align-items: center;">
                          <span style="margin-right: 317px;">Canada Computers</span>
                          <a href="https://www.canadacomputers.com" target="_blank"><button class="buy-button">Buy</button></a>
                    </div>
                    <div style="margin-top: 10px;"></div>
                        <div style="display: flex; align-items: center;">
                          <span style="margin-right: 395px;">Best Buy</span>
                          <a href="https://www.bestbuy.com" target="_blank"><button class="buy-button">Buy</button></a>
                    </div>
                  </div>


            <v-divider class="my-4"></v-divider>
            <div class="d-flex align-center">
              <v-text-field
                v-model="alertPrice"
                label="Alert me when price drops below"
                type="number"
                prefix="$"
                :rules="[
                  (v) => v <= selectedPart.price || 'Alert price must be lower than current price'
                ]"
                density="compact"
                class="flex-grow-1 mr-2"
              ></v-text-field>
              <v-btn
                color="primary"
                @click="setPriceAlert"
                :loading="settingAlert"
                :disabled="!isValidAlertPrice"
                style="margin-bottom: 3vh"
              >
                Set Alert
              </v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeModal" color="red" class="btn">Close</v-btn>
            <v-btn color="grey" @click="addToCart(selectedPart)" class="btn">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="showSnackbar" :color="snackbarColor" :timeout="3000">
        {{ snackbarText }}
        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="showSnackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
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
      networkCards: [],
      modalVisible: false, // Controls whether the modal is open or not
      selectedPart: null, // Stores the part data for the modal
      alertPrice: null,
      settingAlert: false,
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: 'success',
      priceAlerts: new Map() // Store active alerts
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
    },
    isValidAlertPrice() {
      return (
        this.alertPrice && this.selectedPart && Number(this.alertPrice) < this.selectedPart.price
      )
    }
  },
  methods: {
    filterParts(parts) {
      if (!this.searchQuery) return parts
      const query = this.searchQuery.toLowerCase()
      return parts.filter((part) => part.name.toLowerCase().includes(query))
    },
    openModal(part) {
      this.selectedPart = part // This should be set once for each part clicked

      this.modalVisible = true // This will open the modal
    },
    closeModal() {
      this.modalVisible = false // This will close the modal
    },
    addToCart(part) {
    const token = sessionStorage.getItem('token'); // Check if the user is logged in
    if (!token) {
      this.snackbarText = "You need to log in to add items to the cart!";
      this.snackbarColor = "error";
      this.showSnackbar = true;  // Show snackbar if not logged in
      return; 
    }

    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(part);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.snackbarText = `${part.name} added to cart!`;
    this.showSnackbar = true;
  },
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async setPriceAlert() {
      if (!this.isValidAlertPrice) return

      this.settingAlert = true

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store the alert
      const alert = {
        partId: this.selectedPart.name,
        targetPrice: Number(this.alertPrice),
        currentPrice: this.selectedPart.price,
        email: sessionStorage.getItem('userEmail') || 'user@example.com',
        createdAt: new Date()
      }

      this.priceAlerts.set(this.selectedPart.name, alert)

      // Show success message
      this.snackbarColor = 'success'
      this.snackbarText = `We'll email you when ${this.selectedPart.name} drops below $${this.alertPrice}`
      this.showSnackbar = true

      // Simulate price check (for demo purposes)
      this.startPriceCheck(alert)

      this.settingAlert = false
      this.alertPrice = null
    },
    startPriceCheck(alert) {
      setTimeout(() => {
        if (this.priceAlerts.has(alert.partId)) {
          const newPrice = alert.currentPrice * 0.9 // Simulate 10% price drop
          this.simulatePriceAlert(alert, newPrice)
        }
      }, 10000) // Simulate price drop after 10 seconds
    },

    simulatePriceAlert(alert, newPrice) {
      this.snackbarColor = 'info'
      this.snackbarText = `Price Alert: ${alert.partId} has dropped to $${newPrice.toFixed(2)}!`
      this.showSnackbar = true

      // Remove the alert after triggering
      this.priceAlerts.delete(alert.partId)

      console.log(`Email sent to ${alert.email}:
        Subject: Price Drop Alert for ${alert.partId}
        Body: The price has dropped to $${newPrice.toFixed(2)}!
        Click here to view the product.`)
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

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}

.h-100 {
  height: 100%;
}
.buy-button {
    background-color: #007bff; /* Blue color */
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  .buy-button:hover {
    background-color: #0056b3; /* Darker blue when hovering */
  }

  .buy-button:active {
    animation: button-click 0.3s forwards;
  }

  @keyframes button-click {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9); /* Shrink the button */
    }
    100% {
      transform: scale(1); /* Return to original size */
    }
  }

</style>
