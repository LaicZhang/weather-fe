import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import storage from "@/util/storage";
const state = {
  userInfo: storage.getItem("userInfo") || {},
  menuList: storage.getItem("menuList") || [],
  actionList: storage.getItem("actionList") || [],
  leaveCount: 0
};
const getters = {};
export default createStore({
  state,
  getters,
  mutations,
  actions
});
