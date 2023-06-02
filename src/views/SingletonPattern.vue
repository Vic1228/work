<template>
  <div class="layout">
    <h1>組合模式</h1>
  </div>
</template>

<script setup lang="ts">
import { Singleton } from "@/models/SingletonPattern";

const s1: Singleton = Singleton.GetInstance()
const s2: Singleton = Singleton.GetInstance()

if (s1 === s2) {
  console.log('兩個一樣')
}


</script>

<style></style>
