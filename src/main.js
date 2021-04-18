// Main Vue stuff
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
Vue.config.productionTip = false

// Font Awesome Icons
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
import{faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'
import {faCopy} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
library.add(faArrowCircleRight)
library.add(faArrowCircleLeft)
library.add(faQuestionCircle)
library.add(faCopy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Overlay Scrollbar
import 'overlayscrollbars/css/OverlayScrollbars.css'
import OverlayScrollbars from 'overlayscrollbars'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'
Vue.use(OverlayScrollbarsPlugin)
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);
OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    initialize: false
  }
})

// Vue Router stuff
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    title: 'Home',
    component: () => import('./views/Home'),
    meta: {
      title: 'Bitcoin Ipsum'
    }
  },
  {
    path: '/generator',
    component: () => import('./views/Generator'),
    meta: {
      title: 'Generated Text | Bitcoin Ipsum'
    },
    props: {
      useIntro: true,
      paragraphsCount: 5
    }
  },
  {
    path: '/generator/:details/:paragraphsCount',
    component: () => import('./views/Generator'),
    meta: {
      title: 'Generated Text | Bitcoin Ipsum'
    },
    props: route => {
      let params = route.params.details.split(',')
      return {
        useIntro: params.includes('starter-text'),
        memes: params.includes('memes'),
        economics: params.includes('economics'),
        paragraphsCount: parseInt(route.params.paragraphsCount)
      }
    }
  },
  {
    path: '/questions',
    component: () => import('./views/Questions'),
    meta: {
      title: 'Questions & Answers | Bitcoin Ipsum'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Vue Router meta tags and title updates
// This callback runs before every route change, including on page load.
// Thanks to https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));

  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

