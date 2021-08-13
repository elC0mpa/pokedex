import { createClient } from "villus";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/main.scss";
import { ObserveVisibility } from "vue-observe-visibility";

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

app.use(store).use(router).use(client).mount("#app");
