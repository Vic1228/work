<template>
  <div class="layout">
    <h1>橋接模式</h1>
  </div>
</template>

<script setup lang="ts">
import { HandsetBrandN, HandsetBrandM, HandsetGame, HandsetAddressList } from "@/models/BridgePattern";

const brandN = new HandsetBrandN()
const brandM = new HandsetBrandM()

brandN.SetHandsetSoft(new HandsetGame())
brandN.Run()
brandM.SetHandsetSoft(new HandsetGame())
brandM.Run()
brandN.SetHandsetSoft(new HandsetAddressList())
brandN.Run()
brandM.SetHandsetSoft(new HandsetAddressList())
brandM.Run()


</script>

<style></style>
