import { b as ElImage } from "./element.a3f1f34c.js";
import { _ as _export_sfc, r as router, h as getShareInfoApi, o as openShareApi, d as backToSvgVue } from "./index.79015d43.js";
import { f as defineComponent, r as ref, v as onMounted, g as createElementBlock, h as createBaseVNode, Y as toDisplayString, Z as createVNode, F as Fragment, o as openBlock } from "./vue.a4e0d6db.js";
import "./vendor.35fa3fae.js";
var Gallery_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "right-con" };
const _hoisted_2 = { class: "gallery-page" };
const _hoisted_3 = {
  class: "gallery-form",
  "status-icon": ""
};
const _hoisted_4 = { class: "gallery-title" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const text = "\u4E86\u89E3\u66F4\u591A";
    const currentRoute = router.currentRoute.value;
    const shareId = currentRoute.query.shareId;
    const toPageHome = () => {
      router.push("/");
    };
    const userName = ref("");
    const location = ref("");
    const BE_URL = "https://weather-api.zyha.cn/api/".replace("/api/", "");
    const imgUrl = ref("https://img.yzcdn.cn/vant/cat.jpeg");
    const getShareInfo = async () => {
      const data = await getShareInfoApi({
        shareId
      });
      if (data) {
        imgUrl.value = `${BE_URL}${data.shareLink}`;
        userName.value = data.userName;
        location.value = data.shareLocation.city;
      }
    };
    const openShare = async () => {
      await openShareApi({ shareId });
    };
    onMounted(() => {
      openShare();
      getShareInfo();
    });
    return (_ctx, _cache) => {
      const _component_el_image = ElImage;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, " \u6765\u81EA" + toDisplayString(userName.value) + "\u5206\u4EAB\u7684" + toDisplayString(location.value) + "\u5929\u6C14\u9884\u62A5 ", 1),
              createVNode(_component_el_image, {
                style: { "border-radius": "10px" },
                src: imgUrl.value
              }, null, 8, ["src"])
            ])
          ])
        ]),
        createBaseVNode("div", { onClick: toPageHome }, [
          createVNode(backToSvgVue, { text })
        ])
      ], 64);
    };
  }
});
var Gallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-26210dde"]]);
export { Gallery as default };
