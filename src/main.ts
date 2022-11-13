import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/CustomFonts.css";
import "@/assets/base.sass";
import "@/assets/editor.sass";
import "@/assets/nerd-fonts-generated.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
