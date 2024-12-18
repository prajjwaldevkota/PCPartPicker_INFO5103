import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from './components/WelcomePage.vue'
import LoginPage from './components/LoginPage.vue'
import SignUpPage from './components/SignUpPage.vue'
import HomePage from './components/HomePage.vue'
import NewBuildPage from './components/NewBuildPage.vue'
import GuidePage from './components/GuidePage.vue'
import PartsBrowse from './components/PartsBrowse.vue'
import PartReviews from './components/PartReviews.vue'
import CartPage from './components/CartPage.vue'
import { showSnackbar } from './snackbar'
import AdminPage from './components/AdminPage.vue'
import AboutPage from './components/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUpPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/newbuild',
    name: 'New Build',
    component: NewBuildPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuidePage
  },
  {
    path: '/partsbrowser',
    name: 'Parts Browser',
    component: PartsBrowse
  },
  {
    path: '/partreviews',
    name: 'Part Reviews',
    component: PartReviews,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart Page',
    component: CartPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About Page',
    component: AboutPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { requiredAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const isAdmin = sessionStorage.getItem('isAdmin') // Check if the user is an admin

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Route requires authentication
    if (!token) {
      showSnackbar('You are not logged in', 'error')
      return next({ name: 'Login' }) // Redirect to login page
    }
  }

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    // Route requires admin access
    if (!isAdmin) {
      showSnackbar('You are not an admin, please login as an admin to access this page', 'error')
      return next({ name: 'Login' }) // Redirect to login page
    }
  }

  next() // Proceed to the route if all checks pass
})

export default router
