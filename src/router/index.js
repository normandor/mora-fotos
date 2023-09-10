import Vue from "vue";
import VueRouter from "vue-router";
import ImageList from "../components/ImageList.vue";
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter);

const routes = [
  { path: '/', 
    component: () =>
    import(/* webpackChunkName: "home" */ "../views/HomePage.vue"),
  },
  { path: '/photos-by-day', component: ImageList },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/photos",
    name: "Photos",
    component: () =>
      import(/* webpackChunkName: "photos" */ "../views/Photos.vue"),
  },
  {
    path: "/info",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "info" */ "../views/InfoView.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "cart" */ "../views/CartView.vue"),
  },
  {
    path: "/lessons",
    name: "Lessons",
    component: () =>
      import(/* webpackChunkName: "lessons" */ "../views/Lessons.vue"),
  },{
    path: "/tours",
    name: "Tours",
    component: () =>
      import(/* webpackChunkName: "tours" */ "../views/Tours.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})

router.afterEach((to, from) => {
  goTo(0, { duration: 0 })
})
export default router;
