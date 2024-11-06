<template>
    <v-app>
      <v-container>
        <v-card class="pa-4">
          <v-card-title>Create New PC Build</v-card-title>
          
          <v-form @submit.prevent="saveBuild">
            <v-text-field
              v-model="buildName"
              label="Build Name"
              required
            ></v-text-field>
  
            <v-select
              v-model="selectedComponents.cpu"
              :items="components.cpus"
              item-title="name"
              return-object
              label="CPU"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.motherboard"
              :items="components.motherboards"
              item-title="name"
              return-object
              label="Motherboard"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.os"
              :items="components.os"
              item-title="name"
              return-object
              label="Operating System"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.memory"
              :items="components.memory"
              item-title="name"
              return-object
              label="Memory"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.monitor"
              :items="components.monitors"
              item-title="name"
              return-object
              label="Monitor"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.powerSupply"
              :items="components.powerSupplies"
              item-title="name"
              return-object
              label="Power Supply"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.internalHardDrive"
              :items="components.internalHardDrives"
              item-title="name"
              return-object
              label="Storage"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.caseAccessory"
              :items="components.caseAccessories"
              item-title="name"
              return-object
              label="Case Accessory"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.thermalPaste"
              :items="components.thermalPastes"
              item-title="name"
              return-object
              label="Thermal Paste"
            ></v-select>
  
            <v-select
              v-model="selectedComponents.wirelessNetworkCard"
              :items="components.wirelessNetworkCards"
              item-title="name"
              return-object
              label="Wireless Network Card"
            ></v-select>
  
            <div class="text-h6 mt-4">Total Cost: ${{ calculateTotalCost }}</div>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" type="submit">Save Build</v-btn>
              <v-btn @click="$router.push('/home')">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'NewBuildPage',
    data() {
      return {
        buildName: '',
        components: {
          cpus: [],
          motherboards: [],
          os: [],
          memory: [],
          monitors: [],
          powerSupplies: [],
          internalHardDrives: [],
          caseAccessories: [],
          thermalPastes: [],
          wirelessNetworkCards: []
        },
        selectedComponents: {
          cpu: null,
          motherboard: null,
          os: null,
          memory: null,
          monitor: null,
          powerSupply: null,
          internalHardDrive: null,
          caseAccessory: null,
          thermalPaste: null,
          wirelessNetworkCard: null
        }
      }
    },
    computed: {
      calculateTotalCost() {
        let total = 0
        Object.values(this.selectedComponents).forEach(component => {
          if (component && component.price) {
            total += component.price
          }
        })
        return total.toFixed(2)
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
            this.components = {
              cpus: result.data.getCpus || [],
              motherboards: result.data.getMotherboard || [],
              os: result.data.getOS || [],
              memory: result.data.getMemory || [],
              monitors: result.data.getMonitor || [],
              powerSupplies: result.data.getPowerSupply || [],
              internalHardDrives: result.data.getInternalHardDrive || [],
              caseAccessories: result.data.getCaseAccessories || [],
              thermalPastes: result.data.getThermalPaste || [],
              wirelessNetworkCards: result.data.getWirelessNetworkCard || []
            }
          }
        } catch (error) {
          console.error('Error loading components:', error)
        }
      },
  
      async saveBuild() {
        const mutation = `
          mutation SaveBuild(
            $userId: ID
            $name: String
            $cpuName: String
            $cpuCoreClock: Float
            $cpuCoreCount: Int
            $cpuPrice: Float
            $motherboardName: String
            $motherboardPrice: Float
            $osName: String
            $osPrice: Float
            $memoryName: String
            $memoryPrice: Float
            $monitorName: String
            $monitorPrice: Float
            $powerSupplyName: String
            $powerSupplyPrice: Float
            $internalHardDriveName: String
            $internalHardDrivePrice: Float
            $caseAccessoryName: String
            $caseAccessoryPrice: Float
            $thermalPasteName: String
            $thermalPastePrice: Float
            $wirelessNetworkCardName: String
            $wirelessNetworkCardPrice: Float
          ) {
            saveBuild(
              userId: $userId
              name: $name
              cpuName: $cpuName
              cpuCoreClock: $cpuCoreClock
              cpuCoreCount: $cpuCoreCount
              cpuPrice: $cpuPrice
              motherboardName: $motherboardName
              motherboardPrice: $motherboardPrice
              osName: $osName
              osPrice: $osPrice
              memoryName: $memoryName
              memoryPrice: $memoryPrice
              monitorName: $monitorName
              monitorPrice: $monitorPrice
              powerSupplyName: $powerSupplyName
              powerSupplyPrice: $powerSupplyPrice
              internalHardDriveName: $internalHardDriveName
              internalHardDrivePrice: $internalHardDrivePrice
              caseAccessoryName: $caseAccessoryName
              caseAccessoryPrice: $caseAccessoryPrice
              thermalPasteName: $thermalPasteName
              thermalPastePrice: $thermalPastePrice
              wirelessNetworkCardName: $wirelessNetworkCardName
              wirelessNetworkCardPrice: $wirelessNetworkCardPrice
            ) {
              id
              name
            }
          }
        `
        const token = sessionStorage.getItem('token')
        try {
          const variables = {
            userId: sessionStorage.getItem('userId'),
            name: this.buildName,
            cpuName: this.selectedComponents.cpu?.name,
            cpuCoreClock: this.selectedComponents.cpu?.core_clock,
            cpuCoreCount: this.selectedComponents.cpu?.core_count,
            cpuPrice: this.selectedComponents.cpu?.price,
            motherboardName: this.selectedComponents.motherboard?.name,
            motherboardPrice: this.selectedComponents.motherboard?.price,
            osName: this.selectedComponents.os?.name,
            osPrice: this.selectedComponents.os?.price,
            memoryName: this.selectedComponents.memory?.name,
            memoryPrice: this.selectedComponents.memory?.price,
            monitorName: this.selectedComponents.monitor?.name,
            monitorPrice: this.selectedComponents.monitor?.price,
            powerSupplyName: this.selectedComponents.powerSupply?.name,
            powerSupplyPrice: this.selectedComponents.powerSupply?.price,
            internalHardDriveName: this.selectedComponents.internalHardDrive?.name,
            internalHardDrivePrice: this.selectedComponents.internalHardDrive?.price,
            caseAccessoryName: this.selectedComponents.caseAccessory?.name,
            caseAccessoryPrice: this.selectedComponents.caseAccessory?.price,
            thermalPasteName: this.selectedComponents.thermalPaste?.name,
            thermalPastePrice: this.selectedComponents.thermalPaste?.price,
            wirelessNetworkCardName: this.selectedComponents.wirelessNetworkCard?.name,
            wirelessNetworkCardPrice: this.selectedComponents.wirelessNetworkCard?.price
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
            this.$router.push('/home')
          }
        } catch (error) {
          console.error('Error saving build:', error)
        }
      }
    },
    mounted() {
      this.loadComponents()
    }
  }
  </script>