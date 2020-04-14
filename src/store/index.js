import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    users: [],
    isAuth: null
  },
  actions: {
    changePost(context, data) {
      context.commit("setPost", data);
    },

    isAuth(context, data) {
      context.commit("setAuth", data);
    },

    getPosts(context, { vm }) {
      vm.$axios
        .get("/posts")
        .then(res => {
          context.commit("setPosts", res.data.reverse());
        })
        .catch(e => {
          console.error(e);
        });
    },

    removePost(context, id) {
      context.commit("deletePost", id);
    },

    getUsers(context, data) {
      context.commit("setUsers", data);
    }
  },
  mutations: {
    setPost(state, data) {
      let idx = state.posts.findIndex(e => e.id == data.id);
      state.posts.splice(idx, 1, data);
    },

    setPosts(state, data) {
      state.posts = data;
    },

    deletePost(state, id) {
      state.posts = state.posts.filter(item => {
        return item.id !== id;
      });
    },

    setAuth(state, data) {
      state.isAuth = data;
    },

    setUsers(state, data) {
      state.users = data;
    }
  },
  getters: {
    getPosts: state => {
      return state.posts;
    },

    getUsers: state => {
      return state.users;
    },

    isAuth: state => {
      return state.isAuth;
    }
  }
});
