import { w as ElInput, x as ElFormItem, E as ElButton, C as ElCheckbox, y as ElForm } from "./element.a3f1f34c.js";
import { _ as _export_sfc, g as getIpApi, u as useVuexWithRouter, a as getWeatherLikeApi, l as loginApi, m as menuPermissionApi } from "./index.79015d43.js";
import { f as defineComponent, r as ref, a6 as reactive, v as onMounted, g as createElementBlock, h as createBaseVNode, Z as createVNode, S as withCtx, u as unref, O as normalizeStyle, o as openBlock, aJ as pushScopeId, aK as popScopeId, X as createTextVNode } from "./vue.a4e0d6db.js";
import "./vendor.35fa3fae.js";
var Login_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-a5493176"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "login-page" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "login-title" }, " \u767B\u9646 ", -1));
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" \u5FD8\u8BB0\u5BC6\u7801\uFF1F ");
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, "\u6216", -1));
const _hoisted_5 = /* @__PURE__ */ createTextVNode(" \u6CE8\u518C ");
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, "\u6216", -1));
const _hoisted_7 = /* @__PURE__ */ createTextVNode(" \u4E0D\u60F3\u6CE8\u518C\uFF1F\u4E00\u952E\u6E38\u5BA2\u767B\u9646 ");
const _hoisted_8 = /* @__PURE__ */ createTextVNode(" \u767B\u5F55 ");
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const { router, store } = useVuexWithRouter();
    const toPageHome = () => {
      router.push("/");
    };
    const BASE_CDN_URL = store.state.BASE_CDN_URL;
    const baseImgUrl = ref(`${BASE_CDN_URL}/img/bg-default.png`);
    const coverImgUrl = ref("");
    const userFormRef = ref(null);
    const userForm = reactive({
      userName: "",
      userPwd: "",
      isRememberMe: true
    });
    const userRules = {
      userName: [
        {
          required: true,
          message: "\u5FC5\u987B\u586B\u5199\u7528\u6237\u540D",
          trigger: "blur"
        }
      ],
      userPwd: [
        {
          required: true,
          message: "\u5FC5\u987B\u586B\u5199\u5BC6\u7801",
          trigger: "blur"
        }
      ],
      captchaCode: [
        {
          required: true,
          message: "\u5FC5\u987B\u586B\u5199\u9A8C\u8BC1\u7801",
          trigger: "blur"
        }
      ]
    };
    const getMenuPermission = async () => {
      const { menuList, actionList } = await menuPermissionApi();
      store.commit("setActionList", actionList);
      store.commit("setMenuList", menuList);
    };
    const encodedUserPwd = (userPwd) => {
      userForm.userPwd = btoa(userPwd);
      return userForm.userPwd;
    };
    const userFromCommit = () => {
      userFormRef.value.validate(async (valid) => {
        if (valid) {
          encodedUserPwd(userForm.userPwd);
          const loginInfo = await loginApi(userForm);
          store.commit("setUserInfo", loginInfo);
          await getMenuPermission();
          toPageHome();
        } else {
          return false;
        }
      });
    };
    const getWeatherLike = async () => {
      const { condition } = await getWeatherLikeApi();
      coverImgUrl.value = `${BASE_CDN_URL}/img/bg-${condition}.png`;
    };
    const toRegister = () => {
      router.push("/register");
    };
    const toForget = () => {
      router.push("/forget");
    };
    const toHomeAsVisitor = () => {
      userForm.userName = "visitor";
      userForm.userPwd = "123456";
      userFromCommit();
    };
    onMounted(() => {
      getIpApi();
      getWeatherLike();
    });
    return (_ctx, _cache) => {
      const _component_el_input = ElInput;
      const _component_el_form_item = ElFormItem;
      const _component_el_button = ElButton;
      const _component_el_checkbox = ElCheckbox;
      const _component_el_form = ElForm;
      return openBlock(), createElementBlock("div", {
        class: "bg",
        style: normalizeStyle({ backgroundImage: "url(" + (coverImgUrl.value ? coverImgUrl.value : baseImgUrl.value) + ")", backgroundSize: "cover" })
      }, [
        createBaseVNode("div", _hoisted_1, [
          createVNode(_component_el_form, {
            ref_key: "userFormRef",
            ref: userFormRef,
            class: "login-form",
            model: unref(userForm),
            rules: userRules,
            "status-icon": ""
          }, {
            default: withCtx(() => [
              _hoisted_2,
              createVNode(_component_el_form_item, { prop: "userName" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(userForm).userName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(userForm).userName = $event),
                    type: "text",
                    placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { prop: "userPwd" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: unref(userForm).userPwd,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(userForm).userPwd = $event),
                    type: "password",
                    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "text",
                    onClick: toForget
                  }, {
                    default: withCtx(() => [
                      _hoisted_3
                    ]),
                    _: 1
                  }),
                  _hoisted_4,
                  createVNode(_component_el_button, {
                    type: "text",
                    onClick: toRegister
                  }, {
                    default: withCtx(() => [
                      _hoisted_5
                    ]),
                    _: 1
                  }),
                  _hoisted_6,
                  createVNode(_component_el_button, {
                    type: "text",
                    onClick: toHomeAsVisitor
                  }, {
                    default: withCtx(() => [
                      _hoisted_7
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_checkbox, {
                    modelValue: unref(userForm).isRememberMe,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(userForm).isRememberMe = $event),
                    label: "\u8BB0\u4F4F\u6211",
                    border: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    class: "login-submit",
                    size: "large",
                    onClick: userFromCommit
                  }, {
                    default: withCtx(() => [
                      _hoisted_8
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ])
      ], 4);
    };
  }
});
var Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a5493176"]]);
export { Login as default };
