<template>
  <div class="create-post">
    <h1 class="title is-1">Create Post</h1>
    <b-field label="Title">
      <b-input v-model="post.title"> </b-input>
    </b-field>

    <b-field label="Description">
      <b-input type="textarea" v-model="post.description"></b-input>
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
      <div class="control">
        <button class="button is-link is-light" @click="cancelChanges()">
          Cancel changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",

  data: () => ({
    post: {
      title: "",
      description: ""
    }
  }),

  methods: {
    savePost() {
      const post = {
        title: this.post.title,
        description: this.post.description,
        date: new Date(),
        claps: 0
      };
      this.$axios
        .post("/posts", post)
        .then(res => {
          if (res.status === 201) {
            this.$router.push("/");
            this.$buefy.notification.open({
              duration: 5000,
              message: `Post created successfully`,
              position: "is-top-right",
              type: "is-success",
              hasIcon: true
            });
          }
        })
        .catch(e => {
          console.error(e);
        });
    },

    cancelChanges() {
      this.post.title = "";
      this.post.description = "";
    }
  }
};
</script>

<style lang="stylus" scoped>
.create-post {
  width: 500px;
}
</style>
