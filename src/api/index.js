import request from "@/util/request";


export const getRequestApi = (data = {}) => {
  return request.get("/request", data, { mock: false });
};
// auth
export const loginApi = (data = {}) => {
  return request.post("/auth/login", data, { mock: false });
};
export const registerApi = (data = {}) => {
  return request.post("/auth/register", data, { mock: false });
};
export const changePasswordApi = (data = {}) => {
  return request.post("/auth/changePassword", data, { mock: false });
};
// 获取当前角色的权限
export const menuPermissionApi = (data = {}) => {
  return request.get("/auth/getPermissionList", data, { mock: false });
};
// ip相关
export const getIpApi = (data = {}) => {
  return request.get("/auth/ip", data, { mock: false });
};
export const getLocationApi = (data = {}) => {
  return request.get("/auth/location", data, { mock: false });
};

export const getDictApi = (item='',data = {}) => {
  return request.get("/dict?item="+item, data, { mock: false });
};

// 通知管理
export const addNoticeApi = (data = {}) => {
  return request.post("/notices/add", data, { mock: false });
};
export const deleteNoticeApi = (data = {}) => {
  return request.post("/notices/delete", data, { mock: false });
};
export const updateNoticeApi = (data = {}) => {
  return request.post("/notices/update", data, { mock: false });
};
export const editNoticeApi = (data = {}) => {
  return request.post("/notices/edit", data, { mock: false });
};
export const noticeAllListApi = (data = {}) => {
  return request.get("/notices/all", data, { mock: false });
};
export const noticeListApi = (data = {}) => {
  return request.get("/notices/list", data, { mock: false });
};

// 推送管理
export const addPusherApi = (data = {}) => {
  return request.post("/pushers/add", data, { mock: false });
};
export const deletePusherApi = (data = {}) => {
  return request.post("/pushers/delete", data, { mock: false });
};
export const editPusherApi = (data = {}) => {
  return request.post("/pushers/edit", data, { mock: false });
};
export const pusherAllListApi = (data = {}) => {
  return request.get("/pushers/all", data, { mock: false });
};
export const pusherListApi = (data = {}) => {
  return request.get("/pushers/list", data, { mock: false });
};

// 用户管理
export const userListApi = (data = {}) => {
  return request.get("/users/list", data, { mock: false });
};
export const userAllListApi = (data = {}) => {
  return request.get("/users/all/list", data, { mock: false });
};
export const addUserApi = (data = {}) => {
  data.action = "add";
  return request.post("/users/operate", data, { mock: false });
};
export const editUserApi = (data = {}) => {
  data.action = "edit";
  return request.post("/users/operate", data, { mock: false });
};

// 删除单个或多个 `userIds:[userId,userId...]`
export const deleteUserApi = (data = {}) => {
  return request.post("/users/delete", data, { mock: false });
};

export const rolesAllListApi = (data = {}) => {
  return request.get("/roles/allList", data, { mock: false });
};

export const roleListApi = (data = {}) => {
  return request.get("/roles/list", data, { mock: false });
};

export const roleOperateApi = (data = {}) => {
  return request.post("/roles/operate", data, { mock: false });
};

export const rolePermissionApi = (data = {}) => {
  return request.post("/roles/update/permission", data, { mock: false });
};

