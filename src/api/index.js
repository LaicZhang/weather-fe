import request from "@/util/request";

export const loginApi = (data) => {
  return request.post("/users/login", data, { mock: false });
};
export const registerApi = (data = {}) => {
  return request.post("/users/register", data, { mock: false });
};
export const changePasswordApi = (data = {}) => {
  return request.post("/users/changePassword", data, { mock: false });
};
export const menuListApi = (data = {}) => {
  return request.get("/menu/list", data, { mock: false });
};
export const getDictApi = (item='',data = {}) => {
  return request.get("/dict?item="+item, data, { mock: false });
};
// 获取当前角色的权限
export const menuPermissionApi = (data = {}) => {
  return request.get("/users/getPermissionList", data, { mock: false });
};

export const menuOperateApi = (data = {}) => {
  return request.post("/menu/operate", data, { mock: false });
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

// 审核
export const approveOperateApi = (data={})=>{
  return request.post("/leave/approve", data,  { mock: false });
}
export const leaveCountApi = (data = {}) => {
  return request.get("/leave/count", data, { mock: false });
};
export const userListApi = (data = {}) => {
  return request.get("/users/list", data, { mock: false });
};

// 获取负责人
export const userAllListApi = (data = {}) => {
  return request.get("/users/all/list", data, { mock: false });
};

// 删除单个或多个 `userIds:[userId,userId...]`
export const deleteUserApi = (data = {}) => {
  return request.post("/users/delete", data, { mock: false });
};
// 获取角色名称列表
export const rolesAllListApi = (data = {}) => {
  return request.get("/roles/allList", data, { mock: false });
};
// 获取角色列表
export const roleListApi = (data = {}) => {
  return request.get("/roles/list", data, { mock: false });
};

export const roleOperateApi = (data = {}) => {
  return request.post("/roles/operate", data, { mock: false });
};

export const rolePermissionApi = (data = {}) => {
  return request.post("/roles/update/permission", data, { mock: false });
};

export const deptListApi = (data = {}) => {
  return request.get("/dept/list", data, { mock: false });
};
export const deptOperateApi = (data = {}) => {
  return request.post("/dept/operate", data, { mock: false });
};
export const addUserApi = (data = {}) => {
  data.action = "add";
  return request.post("/users/operate", data, { mock: false });
};
export const editUserApi = (data = {}) => {
  data.action = "edit";
  return request.post("/users/operate", data, { mock: false });
};
