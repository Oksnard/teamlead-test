<template>
  <div id="app">
    <Navbar />
    <div class="container content-container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "Root",
  components: { Navbar },

  created() {
    this.$axios
      .get("/users")
      .then(res => {
        this.$store.dispatch("getUsers", res.data);
      })
      .catch(e => {
        console.error(e);
      });
    const isAuth = !localStorage.getItem("user");
    this.$store.dispatch("isAuth", !isAuth);
  }
};
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .content-container {
    display: flex;
    justify-content: center;
    margin: 60px auto;
  }
}
</style>
