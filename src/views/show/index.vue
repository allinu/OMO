<script lang="ts" setup>
import { ref } from 'vue';
import MDViewerVue from './components/MDViewer.vue';
const darkMode = ref(false)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
}

</script>

<template>
  <div class="editor-bg" :class="{ dark: darkMode }">
    <div class="dark-btn">
      <div class="icon" :class="{active: darkMode}" @click="toggleDarkMode">
        <i class="nf-fa-moon_o"></i>
      </div>
      <div class="tips">切换深色模式</div>
    </div>
    <div class="editor-container">
      <MDViewerVue />
    </div>
  </div>
</template>

<style lang="sass">
.dark-btn
  line-height: 30px
  position: fixed
  top: 30px
  right: 30px
.tips
  width: 100px
  height: 30px
  background: #000
  font-size: 14px
  text-align: center
  color: #fff
  line-height: 30px
  border-radius: 15px
  position: absolute
  top: 3px
  right: 40px
  display: none
.icon
  width: 35px
  height: 35px
  text-align: center
  background: #fff
  border: 1px solid #000
  border-radius: 18px
  cursor: pointer
  box-sizing: border-box
  transition: all .5s
  &:hover
    background: #000
    color: #fff
    + .tips
      display: block
  &.active
    background: #000
    color: #fff
</style>
