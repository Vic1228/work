<template>
  <div class="layout">
    <h1>建造者模式</h1>
    <button @click="thinMan" style="margin:10px 0">瘦</button>
    <button @click="fatMan">肥</button>
  </div>
</template>

<script setup lang="ts">
import { ThinPersonBuilder, FatPersonBuilder, PersonDirector, Person } from "@/models/DesignPattern/BuilderPattern.js";

function thinMan() {
  const Builder = new ThinPersonBuilder(new Person())
  const thinDirector = new PersonDirector(Builder)
  const person = thinDirector.createPerson()
  person.display()
}
function fatMan() {
  const Builder = new FatPersonBuilder(new Person())
  const fatDirector = new PersonDirector(Builder)
  const person = fatDirector.createPerson()
  person.display()
}

</script>

<style></style>
