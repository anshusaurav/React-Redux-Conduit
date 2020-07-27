import * as types from "./actionTypes";
const actions = {
  fetchUser: function (payload) {
    return { type: types.FETCH_USER, payload };
  },
  updateUser: function () {
    return { type: types.UPDATE_USER };
  },
};

export default actions;
