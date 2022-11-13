<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { create } from "ipfs-http-client";
import { useRoute } from "vue-router";
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import "juejin-markdown-themes/dist/Chinese-red.min.css";
import "juejin-markdown-themes/dist/Chinese-red";

const route = useRoute();
const cid: any = route.params.cid;

const plugins = [
  gfm()
]

const client = create({ url: "http://127.0.0.1:5001/api/v0" });

const content = ref("");

async function getContent() {
  const stream = await client.cat(cid);
  const decoder = new TextDecoder();
  let data = "";
  for await (const chunk of stream) {
    data += decoder.decode(chunk, { stream: true });
  }
  // content.ops = JSON.parse(data);
  content.value = data;
}

onBeforeMount(() => {
  getContent();
});
</script>
<template>
  <Viewer :value="content" :plugins="plugins" />
</template>

<style lang="sass">
.dark
  filter: invert(1) hue-rotate(.5turn)
  img
    filter: invert(1) hue-rotate(.5turn)
.markdown-body
  width: 50vw
  max-width: 1000px
  min-width: 500px
  margin: 0 auto
  padding: 20px
  img
    width: 100%
    margin: 10px 0
    border-radius: 5px
  p
    text-align: justify
    line-height: 1.5em
</style>
