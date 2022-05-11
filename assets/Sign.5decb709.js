import { _ as _export_sfc } from "./index.79015d43.js";
import { g as createElementBlock, o as openBlock, j as createStaticVNode } from "./vue.a4e0d6db.js";
import "./element.a3f1f34c.js";
import "./vendor.35fa3fae.js";
var Sign_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "Sign",
  components: {},
  data() {
    return {
      time: "",
      flag: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    toPageHome() {
      router.push("/");
    },
    init() {
      const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");
      signUpButton.addEventListener("click", () => container.classList.add("right-panel-active"));
      signInButton.addEventListener("click", () => container.classList.remove("right-panel-active"));
      document.getElementById("demo_img");
      document.getElementById("demo_input");
    }
  }
};
const _hoisted_1 = {
  id: "container",
  class: "container"
};
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<div class="form-container sign-up-container" data-v-404a28c3><form action="#" data-v-404a28c3><h1 data-v-404a28c3>\u6CE8 \u518C</h1><input type="text" placeholder="\u624B\u673A\u53F7" data-v-404a28c3><input type="text" placeholder="\u7528\u6237\u540D" data-v-404a28c3><input type="email" placeholder="\u90AE\u7BB1" data-v-404a28c3><input type="password" placeholder="\u5BC6\u7801" data-v-404a28c3><button data-v-404a28c3>\u6CE8\u518C</button></form></div><div class="form-container sign-in-container" data-v-404a28c3><form action="#" data-v-404a28c3><h1 data-v-404a28c3>\u767B \u5F55</h1><input type="email" placeholder="\u90AE\u7BB1" data-v-404a28c3><input type="password" placeholder="\u5BC6\u7801" data-v-404a28c3><a href="#" data-v-404a28c3>\u5FD8\u8BB0\u5BC6\u7801\uFF1F</a><button data-v-404a28c3>\u767B\u5F55</button></form></div><div class="overlay-container" data-v-404a28c3><div class="overlay" data-v-404a28c3><div class="overlay-panel overlay-left" data-v-404a28c3><h1 data-v-404a28c3>\u5DF2\u6709\u8D26\u53F7\uFF1F</h1><p data-v-404a28c3>\u8BF7\u4F7F\u7528\u60A8\u7684\u8D26\u53F7\u8FDB\u884C\u767B\u5F55</p><button id="signIn" class="ghost" data-v-404a28c3> \u767B\u5F55 </button></div><div class="overlay-panel overlay-right" data-v-404a28c3><h1 data-v-404a28c3>\u6CA1\u6709\u8D26\u53F7\uFF1F</h1><p data-v-404a28c3>\u7ACB\u5373\u6CE8\u518C\u52A0\u5165\u6211\u4EEC</p><button id="signUp" class="ghost" data-v-404a28c3> \u6CE8\u518C </button></div></div></div>', 3);
const _hoisted_5 = [
  _hoisted_2
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_5);
}
var Sign = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-404a28c3"]]);
export { Sign as default };
