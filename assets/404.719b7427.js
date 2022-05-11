import { E as ElButton } from "./element.a3f1f34c.js";
import { _ as _export_sfc } from "./index.79015d43.js";
import { g as createElementBlock, Z as createVNode, S as withCtx, aJ as pushScopeId, aK as popScopeId, o as openBlock, h as createBaseVNode, X as createTextVNode } from "./vue.a4e0d6db.js";
import "./vendor.35fa3fae.js";
var _404_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {};
const _withScopeId = (n) => (pushScopeId("data-v-f75b5b0e"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "page-404" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { style: { "text-align": "center", "font-size": "50px" } }, [
  /* @__PURE__ */ createBaseVNode("h1", null, "404 not found"),
  /* @__PURE__ */ createBaseVNode("h2", null, "it seems you're in the wrong page")
], -1));
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" \u8FD4\u56DE\u9996\u9875 ");
function _sfc_render(_ctx, _cache) {
  const _component_el_button = ElButton;
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(_component_el_button, {
      class: "btn-404",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push("/"))
    }, {
      default: withCtx(() => [
        _hoisted_3
      ]),
      _: 1
    })
  ]);
}
var _404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f75b5b0e"]]);
export { _404 as default };
