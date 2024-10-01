import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from './components/WelcomePage.vue';
import LoginPage from './components/LoginPage.vue';
import SignUpPage from './components/SignUpPage.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUpPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
