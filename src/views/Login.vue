<template>
  <div class="login">
    <h1 class="title is-1">Login</h1>
    <form>
      <b-field label="Email">
        <b-input
          v-model="email.value"
          ref="email"
          placeholder="Email"
          type="email"
          required
          @input="isValidField('email')"
          @keyup.enter.native="login()"
        ></b-input>
      </b-field>

      <b-field label="Password">
        <b-input
          v-model="password.value"
          ref="password"
          placeholder="Password"
          type="password"
          minlength="6"
          password-reveal
          @input="isValidField('password')"
          @keyup.enter.native="login()"
        ></b-input>
      </b-field>
      <div class="control">
        <b-button
          class="button is-link"
          expanded
          @click="login()"
          required
          :disabled="isValid"
        >
          Login
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    email: {
      value: "",
      valid: false
    },
    password: {
      value: "",
      valid: false
    }
  }),

  computed: {
    isValid() {
      if (
        this.email.valid === true &&
        this.password.valid === true &&
        this.password.value.length > 5
      ) {
        return false;
      }
      return true;
    },
    users() {
      return this.$store.getters.getUsers;
    }
  },

  methods: {
    login() {
      const findUser = this.users.find(e => e.login === this.email.value);
      if (findUser) {
        if (findUser.password === +this.password.value) {
          localStorage.setItem("user", JSON.stringify(findUser));
          this.$store.dispatch("isAuth", true);
          this.$router.push({ path: "/" });
        } else {
          this.$buefy.notification.open({
            duration: 5000,
            message: `Incorrect password`,
            position: "is-top-right",
            type: "is-danger",
            hasIcon: true
          });
        }
      } else {
        this.$buefy.notification.open({
          duration: 5000,
          message: `User not found`,
          position: "is-top-right",
          type: "is-danger",
          hasIcon: true
        });
      }
    },

    isValidField(payload) {
      if (payload === "email") {
        if (this.$refs.email.isValid === true) {
          this.email.valid = true;
        }
      }
      if (payload === "password") {
        if (this.$refs.password.isValid === true) {
          this.password.valid = true;
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.login {
  width: 500px;
}
</style>
