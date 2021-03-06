import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/properties',
      name: 'Property',
       // lazy-loaded
       component: () => import('./views/property/Property.vue')
    },
    {
      path: '/createproperty/:propId',
      name: 'CreateProperty',
       // lazy-loaded
       component: () => import('./views/property/CreateProperty.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/propertyDetail/:propId',
      name: 'PropertyDetail',
      // lazy-loaded
      component: () => import('./views/property/PropertyDetail.vue')
    },
    {
      path: '/rent/:propId',
      name: 'RentProperty',
      // lazy-loaded
      component: () => import('./views/property/RentProperty.vue')
    },
    {
      path: '/tenantRentDetail',
      name: 'TenantRentDetail',
      // lazy-loaded
      component: () => import('./views/property/TenantRentDetails.vue')
    },
    {
      path: '/credentialReset',
      name: 'CredentialReset',
      // lazy-loaded
      component: () => import('./views/CredentialReset.vue')
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
