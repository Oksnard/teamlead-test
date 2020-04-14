import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.use(Buefy);

Vue.prototype.$axios = axios.create({
  baseURL: `http://localhost:3000/`
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
