<template>
  <div class="layout">
    <h1>代理模式</h1>

  </div>
</template>

<script setup lang="ts">
import { Proxy, SchoolGirl } from "@/models/ProxyPattern";

calc()

// -- method -- //
function calc(): void {
  try {
    const mm = new SchoolGirl("阿美");
    const proxy = new Proxy(mm);
    proxy.giveDolls()
    proxy.giveFlowers()
    proxy.givePig()
  } catch (e) {
    alert(e)
    return
  }
}

</script>

<style>
</style>
