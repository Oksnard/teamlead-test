<template>
  <b-navbar class="navbar" fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        v-if="isAuth && user.role === 'writer'"
        tag="router-link"
        :to="{ path: '/create-post' }"
      >
        Create Post
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <b-button
          v-if="isAuth === false"
          @click="$router.push({ path: '/login' })"
        >
          Login
        </b-button>
        <b-button v-else @click="logOut()">
          Logout
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",

  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      this.$store.dispatch("isAuth", false);
      this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus">
.navbar {
  box-shadow: 0px -3px 17px 7px rgba(0, 0, 0, 0.22);
}
</style>
