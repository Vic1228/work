<template>
  <div class="layout">
    <h1>組合模式</h1>
  </div>
</template>

<script setup lang="ts">
import { Singleton } from "@/models/DesignPattern/SingletonPattern.js";

const s1 = Singleton.GetInstance()
const s2 = Singleton.GetInstance()

if (s1 === s2) {
  console.log('兩個一樣')
}


</script>

<style></style>
