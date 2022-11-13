<script lang="ts" setup>
import { computed, reactive, ref, onMounted } from "vue";
import { create } from "ipfs-http-client";
import moment from "moment";
import "moment/dist/locale/zh-cn";
import router from "@/router";
import { Editor, Viewer } from "@bytemd/vue-next";
import "bytemd/dist/index.css";
import gfm from "@bytemd/plugin-gfm";
import "juejin-markdown-themes/dist/Chinese-red.min.css";
import "juejin-markdown-themes/dist/Chinese-red";
import zh_Hans from "bytemd/locales/zh_Hans.json";

moment.locale("zh-CN");

const _moment = moment();
let time: string = _moment.format("YYYY/MM/DD dddd");
const today = ref(time);
const cid = ref("");
const client = create({ url: "http://127.0.0.1:5001/api/v0" });
const ifShow = ref(false);
const darkMode = ref(false);
const messageShow = ref(false);
const messageContent = ref("");
const sendTime = reactive({ data: "" });

interface ImageFile extends Blob {
  lastModified: number,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string
}

const editor = reactive({
  config: {
    // lineNumbers: true,
    undoDepth: 500,
    autofocus: true,
  }
})

const content = ref("");
const plugins = [
  gfm(),
  // Add more plugins here
];
async function uploadImage(images: Array<ImageFile>) {
  let res = []
  for (const image of images) {
    const result = await client.add(image);
    const _cid = result.cid.toString();
    console.log("DEBUG | uploadImage | _cid", _cid)
    console.log(content.value)
    message(_cid, "图片上传成功", "图片上传失败");
    res.push({
      url: 'http://127.0.0.1:8081/ipfs/' + _cid,
      alt: image.name, // optional
      title: "", // optional
    })
  }
  return res
}

async function publish() {
  const results = await client.add(content.value);
  cid.value = results.cid.toString();
  message(cid.value, "提交成功", "提交失败");
  await router.push({
    name: "show",
    params: {
      cid: cid.value,
    },
  });
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
}

const darkModeTips = computed(() => {
  if (darkMode.value) {
    return "关闭深色模式";
  } else {
    return "打开深色模式";
  }
});

function show() {
  ifShow.value = !ifShow.value;
}

function message(res: any, successInfo: string, errorInfo: string) {
  res = Boolean(res);
  if (res) {
    messageContent.value = successInfo;
    messageShow.value = true;
    ifShow.value = false;
    setTimeout(() => {
      messageShow.value = false;
    }, 1000);
  } else {
    messageContent.value = errorInfo;
    messageShow.value = true;
    ifShow.value = false;
    setTimeout(() => {
      messageShow.value = false;
    }, 2000);
  }
}

function handleChange(v: string) {
  content.value = v
}

function setDateTime() {
  message(sendTime.data, "时间设定成功", "请选择一个正确的时间");
}

const showTimeInfo = computed(function () {
  if (sendTime.data) {
    return moment(sendTime.data).format("YYYY年MM月DD日 HH:mm");
  } else {
    return "";
  }
});
const sendMessageContent = computed(function () {
  if (sendTime.data) {
    return "点击后将于" + showTimeInfo.value + " 发送";
  } else {
    return "点击发送";
  }
});
const sendTimeMessageContent = computed(function () {
  if (sendTime.data) {
    return "更改发送日期";
  } else {
    return "选择发送日期";
  }
});


</script>
<template>
  <div :class="{dark: darkMode}">
    <Editor v-model:value="content" :locale="zh_Hans" :editorConfig="editor.config" :plugins="plugins"
      :uploadImages="uploadImage" @change="handleChange" placeholder="写下你的故事... " />
    <transition name="fade">
      <div class="message" v-if="messageShow">
        <p><i class="nf-fa-info_circle"></i>{{ messageContent }}</p>
      </div>
    </transition>
    <div class="btn-group">
      <div class="btn" v-if="showTimeInfo">
        <div class="icon clock" :class="{ active: showTimeInfo }">
          <i class="nf-mdi-clock"></i>
        </div>
        <div class="info">{{ showTimeInfo }}</div>
      </div>
      <div class="btn">
        <div class="icon theme" :class="{ active: darkMode }" @click="toggleDarkMode">
          <i class="nf-fa-moon_o"></i>
        </div>
        <div class="tips">{{ darkModeTips }}</div>
      </div>
      <div class="btn">
        <div class="icon time" @click="show">
          <i class="nf-fa-calendar"></i>
        </div>
        <div class="tips">{{ sendTimeMessageContent }}</div>
        <transition name="fade">
          <div class="dropdown" v-show="ifShow">
            <input type="datetime-local" v-model="sendTime.data" />
            <button type="button" @click="setDateTime">确认</button>
          </div>
        </transition>
      </div>
      <div class="btn">
        <div class="icon send" @click="publish">
          <i class="nf-fa-send"></i>
        </div>
        <div class="tips">{{ sendMessageContent }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.dark
  filter: invert(1) hue-rotate(.5turn)
  img
    filter: invert(1) hue-rotate(.5turn)

.bytemd
  height: 100vh
  min-width: 500px
  .bytemd-preview
    padding: 0 20px 0 30px
    img
      width: 100%
      margin: 10px 0
      border-radius: 5px
    p
      text-align: justify
      line-height: 1.5em

.message
  position: fixed
  background: #fff
  top: 50px
  right: 20px
  padding: 10px 10px
  border: 1px solid #000
  border-radius: 10px

  i
    margin-right: 20px

.btn-group
  position: fixed
  right: 50%
  margin-right: -40px
  bottom: 40px
  width: 30px
  display: flex
  flex-direction: column
  justify-content: center
  align-content: center

.btn
  display: flex
  flex-direction: row
  width: 230px
  margin-top: 10px
  text-align: center
  position: relative

  .icon
    cursor: pointer
    width: 35px
    height: 35px
    line-height: 35px
    border-radius: 20px
    border: 1px solid #000
    transition: all .5s
    box-sizing: border-box

    &.active
      background: #000
      color: #fff

    &:hover
      background: #000
      color: white

      + .tips
        display: block

    &.clock
      padding-right: 5px
      &:hover
        + .info
          display: block
      i
        font-size: 23px

    &.time
      padding-right: 5px
        

    &.send
      padding-right: 10px

  .tips, .info
    background: #000
    color: white
    padding: 3px 10px
    border-radius: 10px
    position: absolute
    left: 40px
    top: 5px
    transition: all .2s

  .tips, .info
    display: none


  .dropdown
    position: absolute
    left: -265px
    height: 35px
    border-radius: 20px
    transition: all .5s
    z-index: 999
    background: #fff

    input
      height: 35px
      border: 1px solid #000
      border-radius: 20px
      padding: 0 20px
      box-sizing: border-box

    button
      position: absolute
      border: 1px solid #000
      height: 35px
      width: 60px
      margin-left: 5px
      border-radius: 20px
      background: #000
      cursor: pointer
      color: #fff

i
  font-size: 18px

.fade-enter-active, .fade-leave-active
  transition: opacity .25s

.fade-enter, .fade-leave-to
  opacity: 0
</style>
