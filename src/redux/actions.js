import * as types from "./actionTypes";
const actions = {
  fetchGlobalArticles: function () {
    return { type: types.REQUEST_ARTICLES };
  },
  invalidateGlobalArticles: function () {
    return { type: types.INVALIDATE_ARTICLE };
  },
  fetchTags: function () {
    return { type: types.REQUEST_TAGS };
  },
  fetchUser: function (payload) {
    return { type: types.FETCH_USER, payload };
  },
};

export default actions;
