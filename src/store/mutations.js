import storage from "@/util/storage";

export default {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.setItem("userInfo", userInfo);
  },
  setMenuList(state,list){
    state.menuList = list
    storage.setItem("menuList", list);
  },
  setActionList(state,list){
    state.actionList = list
    storage.setItem("actionList", list);
  },
  setLeaveCount(state,count){
    state.leaveCount = count
  }
};
