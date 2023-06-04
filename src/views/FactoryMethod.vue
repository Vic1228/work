<template>
  <div class="layout">
    <h1>工廠方法模式</h1>
    <button @click="callFactory('undergraduateFactory')" style="margin:10px 0">大學生工廠</button>
    <button @click="callFactory('volunteerFactory')">義工工廠</button>
  </div>
</template>

<script setup lang="ts">
import { FactoryManager } from "@/models/FactoryMethod";

// -- method -- //
function callFactory(factoryName: string): void {
  const undergraduateFactory = FactoryManager.getFactory(factoryName)
  if (undergraduateFactory) {
    const nightingale = undergraduateFactory.createNightingale()
    nightingale.sleep()
    nightingale.sweep()
    nightingale.wash()
  } else {
    console.log(`工廠名稱： ${factoryName} 不存在`)
  }
}

</script>

<style></style>
