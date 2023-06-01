<template>
  <div class="layout">
    <h1>備忘錄模式</h1>
    <button @click="startGame">開始遊戲</button>
    <button v-if="isFightAndSave" @click="saveGame">保存進度</button>
    <button v-if="isLoad" @click="loadGame">讀取進度</button>
    <button v-if="isFightAndSave" @click="fight">戰鬥開始</button>
  </div>
</template>

<script setup lang="ts">
import { GameCharacter, RoleStateCareTaker } from "@/models/MementoPattern";
import { ref } from 'vue'
import type { Ref } from 'vue'

// -- interface -- //
// interface RoleStateMemento {
//   vit: number;
//   str: number;
//   int: number;
// }

// -- ref -- //
const isLoad: Ref<boolean> = ref(false)
const isFightAndSave: Ref<boolean> = ref(false)

// -- created -- //
const vic = new GameCharacter();
let stateAdmin: any; //TODO 後續再看一下型別怎麼寫才會過


// -- method -- //
function startGame() {
  vic.GetInitState();
  vic.StartDisplay();
  isFightAndSave.value = true
}

function saveGame() {
  const saveData = vic.SaveState()
  stateAdmin = new RoleStateCareTaker(saveData)
  isLoad.value = true
}

function loadGame() {
  vic.RecoveryState(stateAdmin.Memento);
  vic.StartDisplay();
}

function fight() {
  vic.Fight();
  vic.StartDisplay();
}

</script>

<style>
button {
  margin: 10px 0;
}
</style>
