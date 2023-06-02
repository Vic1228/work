<template>
  <div class="layout">
    <h1>享元模式</h1>
  </div>
</template>

<script setup lang="ts">
import { WebSiteFactory, User } from "@/models/FlyweightPattern";

const factory = new WebSiteFactory()

const website1 = factory.getWebSiteCategory('產品展示')
website1.use(new User('使用者1'))

const website2 = factory.getWebSiteCategory('產品展示')
website2.use(new User('使用者2'))

const webSite3 = factory.getWebSiteCategory('產品展示')
webSite3.use(new User('使用者3'))

const webSite4 = factory.getWebSiteCategory('部落格')
webSite4.use(new User('使用者4'))

const webSite5 = factory.getWebSiteCategory('部落格')
webSite5.use(new User('使用者5'))

const webSite6 = factory.getWebSiteCategory('部落格')
webSite6.use(new User('使用者6'))

const result = factory.getWebSiteCount()

console.log('網站種類:' + result)

</script>

<style></style>
