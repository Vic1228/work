<template>
  <div class="layout">
    <h1>狀態模式</h1>
    球員名稱
    <div v-for="(ele, idx) in playerList" :key="idx" style="display:flex;align-items: center;">
      <p style="width:50px;text-align: center;">{{ (ele as Forwards).name }}</p>
      <button @click="attack(idx)" style="margin:10px 15px;">進攻</button>
      <button @click="defense(idx)">防守</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Forwards, Translator } from "@/models/AdapterPattern";
import { ref } from 'vue'
import type { Ref } from 'vue'

// -- interface -- //
interface IPlayer {
  Attack(): void;
  Defense(): void;
}

// -- ref -- //
const playerList: Ref<IPlayer[]> = ref([])

// -- created -- //
const vic = new Forwards("Vic")
playerList.value.push(vic)
const bigBird = new Translator("大鳥")
playerList.value.push(bigBird)


// -- method -- //
function attack(idx: number) {
  playerList.value[idx].Attack()
}
function defense(idx: number) {
  playerList.value[idx].Defense()
}

</script>

<style></style>
