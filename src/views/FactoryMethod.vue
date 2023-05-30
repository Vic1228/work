<template>
  <div class="layout">
    <h1>工廠方法模式</h1>
    <button style="margin:10px 0" @click="callUndergraduate">大學生工廠</button>
    <button @click="callVolunteer">義工工廠</button>
  </div>
</template>

<script setup lang="ts">
import { UndergraduateFactory, VolunteerFactory } from "@/models/FactoryMethod";

// -- method -- //
function callUndergraduate() {
  const undergraduateFactory = new UndergraduateFactory()
  const nightingale = undergraduateFactory.createNightingale()
  nightingale.sleep()
  nightingale.sweep()
  nightingale.wash()
}

function callVolunteer() {
  const volunteerFactory = new VolunteerFactory()
  const nightingale = volunteerFactory.createNightingale()
  nightingale.sleep()
  nightingale.sweep()
  nightingale.wash()
}

</script>

<style>
</style>
