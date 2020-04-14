<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ post.title }}</p>
        </div>
      </div>

      <div class="content">{{ post.description }}</div>

      <div class="card-footer">
        <time datetime="2016-1-1">{{ postDate }}</time>
        <div class="card-actions">
          <b-button
            :disabled="!isAuth || user.role !== 'reader'"
            @click="addClap(post)"
          >
            Clap {{ post.claps }}
          </b-button>
          <b-button
            :disabled="!isAuth || user.role !== 'writer'"
            type="is-primary"
            @click="editPost(post)"
          >
            Edit
          </b-button>
          <b-button
            :disabled="!isAuth || user.role !== 'writer'"
            type="is-danger"
            @click="alertRemovePost()"
          >
            Remove
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["post"],

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
    postDate() {
      const titles = ["день", "дня", "дней"];
      let postDate = new Date(this.post.date),
        today = new Date(Date.now()),
        date = Math.ceil((today - postDate) / (1000 * 60 * 24) - 1);
      switch (date) {
        case -0:
          return "Сегодня";
        case 1:
          return "Вчера";
        default:
          return this.dateFormatter({ date, titles });
      }
    }
  },

  methods: {
    alertRemovePost() {
      this.$buefy.dialog.confirm({
        message: "Are you sure you want to delete this post?",
        onConfirm: () => this.removePost()
      });
    },

    addClap(post) {
      post.claps++;
      this.$axios
        .patch(`posts/${post.id}`, {
          claps: post.claps
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.error(e);
        });
    },

    editPost(post) {
      this.$router.push({ name: "EditPost", params: { id: post.id } });
    },

    removePost() {
      this.$axios
        .delete(`/posts/${this.post.id}`)
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch("removePost", this.post.id);
            this.$buefy.notification.open({
              duration: 5000,
              message: `Post removed successfully`,
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

    dateFormatter(data) {
      const formatterDate =
        data.titles[
          data.date % 10 == 1 && data.date % 100 != 11
            ? 0
            : data.date % 10 >= 2 &&
              data.date % 10 <= 4 &&
              (data.date % 100 < 10 || data.date % 100 >= 20)
            ? 1
            : 2
        ];

      return `${data.date} ${formatterDate} назад`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.card {
  margin-bottom: 40px;

  .content {
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;

    .card-actions {
      button:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}
</style>
