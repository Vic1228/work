<template>
  <div class="layout">
    <h1>代理模式</h1>

  </div>
</template>

<script setup lang="ts">
import { Proxy, SchoolGirl } from "@/models/DesignPattern/ProxyPattern.js";

const girl = new SchoolGirl("阿美");
const proxy = new Proxy(girl);
proxy.giveDolls()
proxy.giveFlowers()
proxy.givePig()

</script>

<style></style>
