<template>
  <div class="edit-post">
    <h1 class="title is-1">Edit Post</h1>
    <b-field label="Title">
      <b-input v-model="post.title" />
    </b-field>

    <b-field label="Description">
      <b-input type="textarea" v-model="post.description" />
    </b-field>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :disabled="post.title.length == 0 || post.description.length == 0"
          @click="savePost()"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPost",

  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    post() {
      const id = this.$route.params.id;
      const post = this.posts.find(e => e.id == id);
      localStorage.setItem("originalPost", JSON.stringify(post));
      return post;
    }
  },

  created() {
    this.$store.dispatch("getPosts", { vm: this });
  },

  methods: {
    savePost() {
      this.$axios
        .patch(`posts/${this.post.id}`, {
          title: this.post.title,
          description: this.post.description,
          createdAt: new Date()
        })
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/");
            this.$buefy.notification.open({
              duration: 5000,
              message: `Post changed successfully`,
              position: "is-top-right",
              type: "is-success",
              hasIcon: true
            });
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.edit-post {
  width: 500px;
}
</style>
