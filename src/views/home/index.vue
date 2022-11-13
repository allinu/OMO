<script lang="ts" setup>
import { reactive, ref } from "vue";

const description = ref("即刻开始写信")

</script>

<template>
  <div class="header-out">
    <div class="header">
      <img src="/images/logo.jpg" alt="logo" class="logo" />
    </div>
  </div>
  <div class="container">
    <div class="banner">
      <div class="description">{{description}}</div>
    </div>
  </div>
  <div class="footer"></div>
</template>

<style lang="sass" scoped>
$banner-height: 40px
$btn-width: 80px
$btn-height: 25px
$max-width: 1200px
$width: 80%
.header-out

  .header
    width: $width
    height: $banner-height
    padding: 10px 0
    margin: 0 auto

    .logo
      height: $banner-height


.container
  text-align: center
  margin: 0 auto

  .banner
    height: calc(100vh - $banner-height - 20px)
    background: #FEB90B
    display: flex
    justify-content: center
    align-items: center
    .description
      font-size: 3rem
      font-weight: bold
      margin: 0 auto

</style>
