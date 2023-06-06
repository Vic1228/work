<template>
  <div class="layout">
    <div class="td-container">
      <div style="color:black">初始血量：{{ initialBloodVolume }}</div>
      <div class="monster-way">
        <div v-for="(ele, idx) in monsterList" :key="idx" class="monster-body">
          <img :style="'left:' + ele.location + 'px'" src="@/assets/photo/monster.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MonsterGenerator, Monster } from '@/models/TowerDefense/Monster';

// -- ref -- //
const monsterList: any = ref([]) // 怪物清單
const initialBloodVolume = ref(100) // 初始血量

// -- created -- //
let monsterGenerationInterval: any;
let monsterMovementInterval: any;
const monsterGenerator = new MonsterGenerator()
const monsterObserver = {
  onMonsterMoved: () => {
    monsterList.value = monsterGenerator.getMonsterList()
  },
  onMonsterCreated: (monster: Monster) => {
    console.log("新怪物")
  },
  onMonsterExceededThreshold: () => {
    initialBloodVolume.value--
    if (initialBloodVolume.value <= 0) {
      clearInterval(monsterGenerationInterval);
      clearInterval(monsterMovementInterval);
    }
  }
}
monsterGenerator.addObserver(monsterObserver)

monsterGenerationInterval = setInterval(() => {
  monsterGenerator.generateMonster(1, 100, 1)
}, 500)

monsterMovementInterval = setInterval(() => {
  monsterGenerator.moveMonster()
}, 10)




</script>

<style lang="scss">
.td-container {
  width: 100%;
  height: 100%;
  background-color: rgb(230, 230, 230);

  .monster-way {
    display: flex;
    ;
    margin-top: 10%;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    height: 10%
  }

  .monster-body {
    position: relative;
    height: 100%;

    img {
      position: absolute;
      height: 100%;
    }
  }
}
</style>
