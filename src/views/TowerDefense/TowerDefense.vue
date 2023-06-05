<template>
  <div class="layout">
    <div class="td-container">
      <div class="monster-way">
        <div class="monster-body">
          <img :style="'left:' + dogSpeed + 'px'" src="@/assets/photo/monster.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MonsterGenerator, Monster } from '@/models/TowerDefense/Monster';
const dogSpeed = ref(0)
dogGOGO()
function dogGOGO() {
  const dogGO = setInterval(() => {
    dogSpeed.value++
    if (dogSpeed.value > 100) {
      dogSpeed.value = 0
      clearInterval(dogGO)
      dogGOGO()
    }
  }, 30)
}

const monsterGenerator = new MonsterGenerator()

const monsterObserver = {
  onMonsterMoved: (monster: Monster) => {
    console.log(monsterGenerator.getMonsterList())
    console.log(`怪物 ${monster.location} 移動了`)
  },
  onMonsterCreated: (monster: Monster) => {
    console.log(`創建了一個新怪物 ${monster.location}`)
  }
}

monsterGenerator.addObserver(monsterObserver)

const monster = monsterGenerator.generateMonster(1, 100)
const monster2 = monsterGenerator.generateMonster(1, 100)
monsterGenerator.moveMonster(monster, 16)
monsterGenerator.moveMonster(monster2, 9)



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
