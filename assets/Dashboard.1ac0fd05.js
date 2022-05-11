import { R as ElTooltip, S as ElDivider, q as ElAvatar, a as ElMessage, f as ElIcon, E as ElButton, T as vLoading } from "./element.a3f1f34c.js";
import { s as store, _ as _export_sfc, r as router, b as getStackdataApi, g as getIpApi, c as addShareApi, d as backToSvgVue, e as storage, f as getAllDataListApi } from "./index.79015d43.js";
import { f as defineComponent, a6 as reactive, o as openBlock, g as createElementBlock, h as createBaseVNode, Z as createVNode, S as withCtx, Y as toDisplayString, r as ref, v as onMounted, F as Fragment, R as createBlock, a4 as resolveComponent, X as createTextVNode, aJ as pushScopeId, aK as popScopeId, aQ as useClipboard, T as withDirectives, W as createCommentVNode } from "./vue.a4e0d6db.js";
import { u as use, i as install, a as install$1, b as install$2, c as install$3, d as init, e as install$4, f as install$5, g as install$6, h as install$7, j as install$8, k as install$9, l as installUniversalTransition, m as install$a, n as install$b } from "./echarts.35471c7e.js";
import "./vendor.35fa3fae.js";
var LifeIndex_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$2 = { class: "life-index" };
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("div", null, "\u4ECA\u65E5\u751F\u6D3B\u6307\u6570", -1);
const _hoisted_3$1 = { class: "index-content" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const today = store.state.weatherData.today.lifeIndex;
    const clothesIndex = reactive(today.ct);
    const rayIndex = reactive(today.uv);
    const carIndex = reactive(today.xc);
    const clothesIndexText = `${clothesIndex.liNm}:${clothesIndex.liAttr},${clothesIndex.liDese}`;
    const rayIndexText = `${rayIndex.liNm}:${rayIndex.liAttr},${rayIndex.liDese}`;
    const carIndexText = `${carIndex.liNm}:${carIndex.liAttr},${carIndex.liDese}`;
    return (_ctx, _cache) => {
      const _component_el_tooltip = ElTooltip;
      const _component_el_divider = ElDivider;
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _hoisted_2$1,
        createBaseVNode("div", _hoisted_3$1, [
          createVNode(_component_el_tooltip, {
            class: "box-item",
            effect: "dark",
            content: clothesIndexText,
            placement: "top-end"
          }, {
            default: withCtx(() => [
              createBaseVNode("p", null, toDisplayString(clothesIndexText))
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          createVNode(_component_el_tooltip, {
            class: "box-item",
            effect: "dark",
            content: carIndexText,
            placement: "top-end"
          }, {
            default: withCtx(() => [
              createBaseVNode("p", null, toDisplayString(carIndexText))
            ]),
            _: 1
          }),
          createVNode(_component_el_divider),
          createVNode(_component_el_tooltip, {
            class: "box-item",
            effect: "dark",
            content: rayIndexText,
            placement: "top-end"
          }, {
            default: withCtx(() => [
              createBaseVNode("p", null, toDisplayString(rayIndexText))
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
var Radar_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    use([install, install$1, install$2, install$3]);
    const myRef = ref(null);
    const init$1 = () => {
      const myChart = init(document.getElementById("radar"));
      const realTime = store.state.weatherData.realTime;
      const indicator = [
        { name: "\u80FD\u89C1\u5EA6", max: 20 },
        { name: "AQI", max: 300 },
        { name: "\u6E29\u5EA6", max: 40 },
        { name: "\u6E7F\u5EA6", max: 100 },
        { name: "\u964D\u96E8\u91CF", max: 100 },
        { name: "\u98CE\u901F", max: 50 },
        { name: "\u98CE\u529B", max: 10 }
      ];
      const option = {
        title: {
          text: "\u5B9E\u65F6\u5929\u6C14\u6307\u6570"
        },
        radar: {
          indicator
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [
                  realTime.wtVisibility < indicator[0].max ? realTime.wtVisibility : indicator[0].max,
                  realTime.wtAqi < indicator[1].max ? realTime.wtAqi : indicator[1].max,
                  realTime.wtTemp < indicator[2].max ? realTime.wtTemp : indicator[2].max,
                  realTime.wtHumi < indicator[3].max ? realTime.wtHumi : indicator[3].max,
                  realTime.wtRainfall < indicator[4].max ? realTime.wtRainfall : indicator[4].max,
                  realTime.wtWins < indicator[5].max ? realTime.wtWins : indicator[5].max,
                  realTime.wtWinp < indicator[6].max ? realTime.wtWinp : indicator[6].max
                ]
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    };
    onMounted(() => {
      init$1();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          id: "radar",
          ref_key: "myRef",
          ref: myRef
        }, null, 512),
        createBaseVNode("div", null, [
          createVNode(_sfc_main$7)
        ])
      ], 64);
    };
  }
});
var Radar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-3e6a6ea0"]]);
var Bar1_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    use([
      install,
      install$4,
      install$5,
      install$6,
      install$1,
      install$7,
      install$8,
      install$9,
      install$3,
      installUniversalTransition
    ]);
    const myRef = ref(null);
    const init$1 = () => {
      const element = document.getElementById("bar1");
      const myChart = init(element);
      const futureDay = store.state.weatherData.futureDay;
      const week = [];
      const wtTemp1List = [];
      const wtTemp2List = [];
      futureDay.forEach((item) => {
        week.push(item.week);
        wtTemp1List.push(item.wtTemp1);
        wtTemp2List.push(item.wtTemp2);
      });
      const option = {
        title: {
          text: "\u4E00\u5468\u663C\u591C\u6E29\u5DEE"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["\u767D\u5929", "\u591C\u95F4"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: week
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "\u767D\u5929",
            type: "line",
            data: wtTemp1List,
            markPoint: {
              data: [
                { type: "max", name: "Max", symbolSize: 25 },
                { type: "min", name: "Min", symbolSize: 25 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }]
            }
          },
          {
            name: "\u591C\u95F4",
            type: "line",
            data: wtTemp2List,
            markPoint: {
              data: [
                { type: "max", name: "Max", symbolSize: 25 },
                { type: "min", name: "Min", symbolSize: 25 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }]
            }
          }
        ]
      };
      myChart.setOption(option);
    };
    onMounted(() => {
      init$1();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "bar1",
        ref_key: "myRef",
        ref: myRef
      }, null, 512);
    };
  }
});
var Bar1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-da61d30a"]]);
var LineMarker_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    use([
      install,
      install$4,
      install$5,
      install$6,
      install$a,
      install$b,
      install$7,
      install$9,
      install$3,
      installUniversalTransition
    ]);
    const myRef = ref(null);
    const initT = () => {
      const element = document.getElementById("link-marker");
      const myChart = init(element);
      const futureHour = store.state.weatherData.futureHour;
      const xAxisData = [];
      const wtTempList = [];
      futureHour.forEach((item) => {
        const datedh = item.dateYmdh.substring(5).slice(0, -3);
        xAxisData.push(datedh);
        wtTempList.push(item.wtTemp);
      });
      const option = {
        title: {
          text: "\u672A\u676524\u5C0F\u65F6\u6E29\u5EA6\u53D8\u5316"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} \xB0C"
          }
        },
        series: [
          {
            name: "\u6E29\u5EA6",
            type: "line",
            data: wtTempList,
            markPoint: {},
            markLine: {
              data: [
                { type: "average", name: "Avg" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max"
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Max"
                    },
                    type: "max",
                    name: "\u6700\u9AD8\u70B9"
                  }
                ]
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    };
    onMounted(() => {
      initT();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "link-marker",
        ref_key: "myRef",
        ref: myRef
      }, null, 512);
    };
  }
});
var LineMarker = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5c51b36c"]]);
var AreaStack_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    use([
      install,
      install$4,
      install$5,
      install$6,
      install$1,
      install$9,
      install$3,
      installUniversalTransition
    ]);
    const myRef = ref(null);
    const init$1 = async () => {
      const element = document.getElementById("area-stack");
      const myChart = init(element);
      const currentRoute = router.currentRoute.value;
      const ip = currentRoute.query.ip;
      const stackData = await getStackdataApi({ ip });
      const option = {
        title: {
          text: "\u5386\u53F2\u6E29\u5EA6\u53D8\u5316",
          left: "1%"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "10%"
        },
        xAxis: {
          data: stackData.arr.map((item) => {
            return item[0];
          })
        },
        yAxis: {},
        dataZoom: [
          {
            startValue: "2022-03-10"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              lte: 15,
              color: "#93CE07"
            },
            {
              gt: 15,
              lte: 25,
              color: "#FBDB0F"
            },
            {
              gt: 25,
              lte: 30,
              color: "#FC7D02"
            },
            {
              gt: 30,
              lte: 35,
              color: "#FD0100"
            },
            {
              gt: 35,
              lte: 40,
              color: "#AA069F"
            },
            {
              gt: 40,
              color: "#AC3B2A"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: [
          {
            name: "\u6700\u9AD8\u6E29\u5EA6",
            type: "line",
            data: stackData.arr.map((item) => {
              return item[1];
            }),
            markLine: {
              silent: true,
              lineStyle: {
                color: "#333"
              },
              data: [
                {
                  yAxis: 0
                },
                {
                  yAxis: 15
                },
                {
                  yAxis: 25
                },
                {
                  yAxis: 30
                },
                {
                  yAxis: 40
                }
              ]
            }
          },
          {
            name: "\u6700\u4F4E\u6E29\u5EA6",
            type: "line",
            data: stackData.arr.map((item) => {
              return item[2];
            }),
            markLine: {
              silent: true,
              lineStyle: {
                color: "#444"
              },
              data: [
                {
                  yAxis: 0
                },
                {
                  yAxis: 15
                },
                {
                  yAxis: 25
                },
                {
                  yAxis: 30
                },
                {
                  yAxis: 40
                }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    };
    onMounted(() => {
      init$1();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "area-stack",
        ref_key: "myRef",
        ref: myRef
      }, null, 512);
    };
  }
});
var AreaStack = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-341c3a9f"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const avatar = ref("");
    if (store.state.userInfo.userId)
      avatar.value = store.state.UPLOAD_CDN_URL + store.state.userInfo.avatar;
    else
      avatar.value = `${store.state.UPLOAD_CDN_URL}default-avatar.png`;
    return (_ctx, _cache) => {
      const _component_el_avatar = ElAvatar;
      return openBlock(), createBlock(_component_el_avatar, { src: avatar.value }, null, 8, ["src"]);
    };
  }
});
var Layout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-88b2a378"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "layout-page" };
const _hoisted_2 = { class: "grid-container" };
const _hoisted_3 = { class: "header" };
const _hoisted_4 = { class: "city-name" };
const _hoisted_5 = {
  key: 1,
  style: { "float": "right" }
};
const _hoisted_6 = /* @__PURE__ */ createTextVNode(" \u767B\u5F55 ");
const _hoisted_7 = /* @__PURE__ */ createTextVNode(" \u6CE8\u518C ");
const _hoisted_8 = { class: "content" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "middle-container" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "middle" })
], -1));
const _hoisted_10 = { class: "left" };
const _hoisted_11 = { class: "right" };
const _hoisted_12 = { class: "bottom" };
const _hoisted_13 = { class: "sidebar" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const userId = ref("");
    userId.value = store.state.userInfo.userId;
    const city = ref("");
    const currentRoute = window.location.href;
    const shareForeUrl = currentRoute.replace("dashboard", "gallery");
    const area = store.state.weatherData;
    city.value = `${area.area_1 + area.area_2 + area.area_3}\u5929\u6C14\u53EF\u89C6\u5316`;
    const getIp = async () => {
      const { ip } = await getIpApi();
      store.commit("setIp", ip);
    };
    const shareCurrentWeather = async () => {
      const data = await addShareApi({
        ip: store.state.ip,
        userId: store.state.userInfo.userId
      });
      if (data) {
        const { copy } = useClipboard();
        copy(`${shareForeUrl}?shareId=${data.shareId}`);
        ElMessage.success("\u5206\u4EAB\u94FE\u63A5\u5DF2\u590D\u5236\u5230\u526A\u5207\u677F\uFF0C\u5FEB\u53BB\u5206\u4EAB\u5427");
      } else {
        ElMessage.error("\u5206\u4EAB\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
      }
    };
    onMounted(() => {
      getIp();
    });
    return (_ctx, _cache) => {
      const _component_share = resolveComponent("share");
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", null, [
                createTextVNode(toDisplayString(city.value) + " ", 1),
                createVNode(_component_el_icon, {
                  size: 20,
                  style: { "cursor": "pointer" },
                  color: "#409EFC",
                  onClick: shareCurrentWeather
                }, {
                  default: withCtx(() => [
                    createVNode(_component_share)
                  ]),
                  _: 1
                })
              ]),
              userId.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "avatar-item",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push("/system/userInfo"))
              }, [
                createVNode(_sfc_main$2)
              ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
                createVNode(_component_el_button, {
                  size: "default",
                  type: "primary",
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$router.push("/login"))
                }, {
                  default: withCtx(() => [
                    _hoisted_6
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  size: "default",
                  type: "primary",
                  onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$router.push("/register"))
                }, {
                  default: withCtx(() => [
                    _hoisted_7
                  ]),
                  _: 1
                })
              ]))
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            _hoisted_9,
            createBaseVNode("div", _hoisted_10, [
              createVNode(LineMarker)
            ]),
            createBaseVNode("div", _hoisted_11, [
              createVNode(Bar1)
            ]),
            createBaseVNode("div", _hoisted_12, [
              createVNode(AreaStack)
            ])
          ]),
          createBaseVNode("div", _hoisted_13, [
            createVNode(Radar)
          ])
        ])
      ]);
    };
  }
});
var Layout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-88b2a378"]]);
var Dashboard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  name: "Dashboard",
  components: {
    backToSvg: backToSvgVue,
    Layout
  },
  data() {
    return {
      text: "\u524D\u5F80\u767B\u9646",
      isLoaded: false,
      currentRoute: {},
      ip: ""
    };
  },
  created() {
    this.getUrlIp();
    this.getAllDataList();
  },
  mounted() {
    if (storage.getItem("userInfo"))
      this.text = "\u524D\u5F80\u540E\u53F0";
  },
  methods: {
    getUrlIp() {
      this.currentRoute = router.currentRoute.value;
      this.ip = this.currentRoute.query.ip;
    },
    toPageHome() {
      router.go(-1);
    },
    today(date) {
      const day = date.getDay();
      const week = ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"];
      return week[day];
    },
    async getAllDataList() {
      const res = await getAllDataListApi({ ip: this.ip });
      store.commit("setWeatherData", res.result);
      this.isLoaded = true;
    }
  }
};
const _hoisted_1 = { class: "dashboard-page" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layout = resolveComponent("Layout");
  const _component_backToSvg = backToSvgVue;
  const _directive_loading = vLoading;
  return openBlock(), createElementBlock(Fragment, null, [
    withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
      $data.isLoaded ? (openBlock(), createBlock(_component_Layout, { key: 0 })) : createCommentVNode("", true)
    ])), [
      [_directive_loading, !$data.isLoaded]
    ]),
    createBaseVNode("div", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.toPageHome && $options.toPageHome(...args))
    }, [
      createVNode(_component_backToSvg, { text: $data.text }, null, 8, ["text"])
    ])
  ], 64);
}
var Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-14d2aa97"]]);
export { Dashboard as default };
