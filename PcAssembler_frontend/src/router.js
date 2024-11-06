import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from './components/WelcomePage.vue';
import LoginPage from './components/LoginPage.vue';
import SignUpPage from './components/SignUpPage.vue';
import HomePage from './components/HomePage.vue';
import NewBuildPage from './components/NewBuildPage.vue';
import GuidePage from './components/GuidePage.vue';
import PartsBrowse from './components/PartsBrowse.vue';
import PartReviews from './components/PartReviews.vue';

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
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/newbuild',
    name: 'New Build',
    component: NewBuildPage,
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuidePage,
  },
  {
    path: '/partsbrowser',
    name: 'Parts Browser',
    component: PartsBrowse,
  },
  {
    path: '/partreviews',
    name: 'Part Reviews',
    component: PartReviews,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;