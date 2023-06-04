<template>
  <div class="layout">
    <h1>享元模式</h1>
  </div>
</template>

<script setup lang="ts">
import { WebSiteFactory, User } from "@/models/FlyweightPattern";


const factory = new WebSiteFactory()

const webside1 = factory.getWebSiteCategory("產品展示")
webside1.use(new User("小菜"))

const webside2 = factory.getWebSiteCategory("產品展示")
webside2.use(new User("大鳥"))

const webside3 = factory.getWebSiteCategory("部落格")
webside3.use(new User("頑童"))

const webside4 = factory.getWebSiteCategory("部落格")
webside4.use(new User("嬌嬌"))

console.log("網站分類總數共：" + factory.getWebSiteCount())


</script>

<style></style>
