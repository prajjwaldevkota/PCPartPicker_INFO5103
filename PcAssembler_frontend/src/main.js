import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router

import vuetify from './plugins/vuetify'


const app = createApp(App);
// Use the router instance
app.use(router);
app.use(vuetify);
app.mount('#app');