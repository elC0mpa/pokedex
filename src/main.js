import { createClient } from "villus";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/main.scss";
import { ObserveVisibility } from "vue-observe-visibility";
import veProgress from "vue-ellipse-progress";
import { vfmPlugin } from "vue-final-modal";

const app = createApp(App);

app.directive("observe-visibility", {
  beforeMount: (el, binding, vnode) => {
    vnode.context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  update: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
});

const client = createClient({
  url: "https://dex-server.herokuapp.com/", // your endpoint.
});

app
  .use(store)
  .use(router)
  .use(client)
  .use(veProgress)
  .use(vfmPlugin)
  .mount("#app");
