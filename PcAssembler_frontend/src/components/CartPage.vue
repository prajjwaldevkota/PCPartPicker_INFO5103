<template>
  <v-app>
    <v-container>
      <h1 style="margin-top:60px;">Your Cart</h1>
      <v-row justify="space-between">
        <v-col cols="12" md="8">
          <v-list>
            <v-list-item-group v-if="cartItems.length > 0">
              <v-list-item v-for="item in cartItems" :key="item.id">
                <v-row class="align-center" justify="space-between" style="padding:5px;">
                  <v-col>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Price: ${{ item.price.toFixed(2) }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-col>
                  <v-col cols="auto">
                    <v-list-item-action>
                      <v-btn icon @click="removeFromCart(item.name)">
                        <v-icon color="red darken-2">mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list-item-group>
            <v-list-item v-else>
              <v-list-item-content>No items in the cart</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="pa-4">
            <v-card-title>Total Summary</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div><strong>Subtotal:</strong> ${{ subtotal.toFixed(2) }}</div>
              <div><strong>Tax (13% HST):</strong> ${{ tax.toFixed(2) }}</div>
              <div><strong>Total:</strong> ${{ total.toFixed(2) }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="checkout">Checkout</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { showSnackbar, snackbar } from '@/snackbar';
export default {
  name: 'CartPage',
  data() {
    return {
      cartItems: JSON.parse(sessionStorage.getItem('cart')) || [],
      snackbar,
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0)
    },
    tax() {
      return this.subtotal * 0.13 // 13% HST for Ontario
    },
    total() {
      return this.subtotal + this.tax
    }
  },
  methods: {
    removeFromCart(itemName) {
      showSnackbar(`${itemName} has been removed from the cart`, 'error')
      this.cartItems = this.cartItems.filter((item) => item.name !== itemName)
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems))
    },
    checkout() {
      if (this.cartItems.length === 0) {
        showSnackbar('Your cart is empty!', 'info')
        return
      }
      // Simulate checkout
      showSnackbar('Checkout successful! Thank you for your purchase.')
      this.cartItems = []
      sessionStorage.setItem('cart', JSON.stringify(this.cartItems))
    }
  }
}
</script>

<style scoped>
.v-list {
  margin-bottom: 20px;
}
</style>
