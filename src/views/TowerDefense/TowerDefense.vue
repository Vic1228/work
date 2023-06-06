<template>
  <div class="layout">
    <div class="td-container">
      <div style="color:black">血量：{{ initialBloodVolume }}</div>
      <div class="monster-way">
        <div v-for="(ele, idx) in monsterList" :key="idx" class="monster-body">
          <img :style="'left:' + ele.location + 'px'" src="@/assets/photo/monster.png" alt="">
        </div>
      </div>
      <div class="tower-space">
        <div v-for="(ele, idx) in towerList" :key="idx" class="tower-body">
          <img v-if="ele.tower" src="@/assets/photo/cat.png" alt="">
          <div v-else @click="createTower(idx)" class="tower-noDisplay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MonsterGenerator, Monster, MonsterObserver } from '@/models/TowerDefense/Monster';
import { TowerGenerator } from '@/models/TowerDefense/Tower';

// -- ref -- //
const monsterList = ref<{ monster: Monster; location: number }[]>([]); // 怪物清單
const towerList = ref<any>([]); // 防禦塔清單
const initialBloodVolume = ref(100); // 初始血量

// -- created -- //
//* 創建怪物觀察者
const monsterObserver: MonsterObserver = {
  // 怪物移動
  onMonsterMoved() {
    monsterList.value = monsterGenerator.getMonsterList();
  },
  // 怪物創造
  onMonsterCreated() {
    monsterList.value = monsterGenerator.getMonsterList();
  },
  // 怪物超出範圍
  onMonsterExceededThreshold() {
    initialBloodVolume.value--;
    if (initialBloodVolume.value <= 0) {
      clearInterval(monsterGenerationInterval);
      clearInterval(monsterMovementInterval);
    }
  },
};


//* 創建怪物生成器
const monsterGenerator = new MonsterGenerator();
monsterGenerator.addObserver(monsterObserver);

//* 創建防禦塔生成器
const towerGenerator = new TowerGenerator()
towerList.value = towerGenerator.getTowerList()

//* 設定怪物生成和移動的間隔時間
const monsterGenerationInterval = setInterval(() => {
  monsterGenerator.generateMonster(1, 30, 1, 30);
}, 2000);

const monsterMovementInterval = setInterval(() => {
  monsterGenerator.moveMonster(towerList.value);
}, 10);

// -- method -- //
function createTower(index: number): void {
  towerGenerator.generateTower(1, index, 800)
}

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
    height: 10%;

    .monster-body {
      position: relative;
      height: 100%;

      img {
        position: absolute;
        height: 100%;
      }
    }
  }

  .tower-space {
    display: flex;

    .tower-body {
      width: calc(100%/6);

      .tower-noDisplay {
        border: 1px solid black;
        height: 100%;
        min-height: 100px;
      }

      img {
        width: 100%
      }
    }
  }

}
</style>
