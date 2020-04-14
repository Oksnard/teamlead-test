import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

async function guardMyroute(to, from, next) {
  const user = await JSON.parse(localStorage.getItem("user"));
  const isAuth = await store.getters.isAuth;
  isAuth && user.role === "writer"
    ? next()
    : next({
        path: from.path
      });
}

const routes = [
  {
    path: "/",
    name: "PostsList",
    component: () => import("@/views/PostsList.vue")
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: () => import("@/views/CreatePost.vue"),
    beforeEnter: guardMyroute
  },
  {
    path: "/edit-post/:id",
    name: "EditPost",
    component: () => import("@/views/EditPost.vue"),
    beforeEnter: guardMyroute
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
