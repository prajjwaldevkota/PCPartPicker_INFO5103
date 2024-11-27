import { reactive } from 'vue';

export const cartState = reactive({
  items: [],
  addItem(part) {
    // Check if the item is already in the cart
    const existingItem = this.items.find(item => item.id === part.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if already in cart
    } else {
      this.items.push({ ...part, quantity: 1 }); // Add new item with quantity
    }
  },
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  },
});
