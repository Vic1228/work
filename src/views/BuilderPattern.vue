<template>
  <div class="layout">
    <h1>建造者模式</h1>
    <button @click="thinMan" style="margin:10px 0">瘦</button>
    <button @click="fatMan">肥</button>
  </div>
</template>

<script setup lang="ts">
import { PersonThinBuilder, PersonFatBuilder, PersonDirector } from "@/models/BuilderPattern";

function thinMan() {
  const Builder = new PersonThinBuilder()
  const thinDirector = new PersonDirector(Builder)
  thinDirector.createPerson()
}
function fatMan() {
  const Builder = new PersonFatBuilder()
  const thinDirector = new PersonDirector(Builder)
  thinDirector.createPerson()
}

</script>

<style>
</style>
