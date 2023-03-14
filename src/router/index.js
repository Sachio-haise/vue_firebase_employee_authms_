import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/dashboard.vue'
import {auth} from '../components/firebaseInit'

let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/employee-create',
      name: 'employee-create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/employee_create.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/employee-edit/:id',
      name: 'employee-edit',
      component: () => import('../components/employee_edit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/employee/:id',
      name: 'employee',
      component: () => import('../components/employee.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login.vue'),
      meta: {
        requiresGuest:true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register.vue'),
      meta: {
        requiresGuest:true
      }
    },
    {
      path:"/:catchAll(.*)",
      component: () => import('../components/login.vue'),
    }
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!auth.currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (auth.currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router
