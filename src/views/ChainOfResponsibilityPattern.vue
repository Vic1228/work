<template>
  <div class="layout">
    <h1>職責鏈模式</h1>
  </div>
</template>

<script setup lang="ts">
import { CommonManager, Majordomo, GeneralManager, RequestItem } from "@/models/ChainOfResponsibilityPattern";

const commonManager = new CommonManager('經理')
const majordomo = new Majordomo('總監')
const generalManager = new GeneralManager('總經理')

commonManager.SetSuperior(majordomo)
majordomo.SetSuperior(generalManager)

const request1 = new RequestItem('加薪', '要求加薪', 500)
commonManager.RequestApplication(request1)

const request2 = new RequestItem('請假', '要求請假', 5)
commonManager.RequestApplication(request2)


</script>

<style></style>
