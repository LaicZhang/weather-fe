import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default function (){
 return {
  route: useRoute(),
  router: useRouter(),
  store: useStore(),
 }
};
