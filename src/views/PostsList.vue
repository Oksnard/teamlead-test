<template>
  <div class="todo-list">
    <h1 class="title is-1">Posts List</h1>
    <h3 class="title" v-if="posts.length == 0">No posts :(</h3>
    <template v-esle>
      <div v-for="post in postsFormatter" :key="post.id">
        <Card :post="post" />
      </div>
      <b-pagination
        class="pagination"
        :total="posts.length"
        :current.sync="current"
        order="is-centered"
        :per-page="perPage"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
      </b-pagination>
    </template>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "PostsList",
  components: {
    Card
  },

  data: () => ({
    perPage: 10,
    current: 1
  }),

  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    postsFormatter() {
      const start = this.perPage * this.current - 10,
        end = start + this.perPage;
      return this.posts.slice(start, end);
    }
  },

  created() {
    this.$store.dispatch("getPosts", { vm: this });
  }
};
</script>

<style lang="stylus" scoped>
.todo-list {
  width: 500px;

  .pagination {
    position: sticky;
    bottom: 5px;
    background: #fafafa;
    box-shadow: 0px 3px 17px 7px rgba(0,0,0,0.22);
    border-radius: 4px;
  }
}
</style>
