<template>
  <div class="layout">
    <div class="td-container" ref="mapWidth">
      <div style="padding:15px;">
        <div style="color:black;font-weight: 900;">血量：{{ initialBloodVolume }}</div>
        <div style="color:black;font-weight: 900;">金幣：{{ initialMoney }}</div>
        <div style="color:black;font-weight: 900;">關卡：{{ currentLevel }}</div>
      </div>
      <div class="monster-way">
        <div v-for="(ele, idx) in monsterList" :key="idx" class="monster-body">
          <img :style="'left:' + ele.location + 'px'" src="@/assets/photo/monster.png" alt="">
        </div>
      </div>
      <div class="tower-space">
        <div v-for="(ele, idx) in towerList" :key="idx" class="tower-body">
          <div @click="chooseTower(idx)" v-if="ele.tower" :class="ele.attack">
            <img class="" src="@/assets/photo/cat.png" alt="">
          </div>
          <div v-else @click="createTower(idx)" class="tower-noDisplay"></div>
          <div class="tower-select" v-show="idx == selectedTower">已選擇</div>
        </div>
      </div>
      <div style="display:flex;justify-content: space-around;margin-top:40px;">
        <button @click="updateTower('UpdateLevelTowerDecorator')">升級($100)</button>
        <button @click="updateTower('AttackPowerTowerDecorator')">增加攻擊力($10)</button>
        <button @click="updateTower('AttackSpeedTowerDecorator')">增加攻擊速度($10)</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MonsterGenerator, Monster, MonsterObserver } from '@/models/TowerDefense/Monster';
import { TowerGenerator, TowerObserver, UpdateFactory } from '@/models/TowerDefense/Tower';

// -- ref -- //
const mapWidth = ref<any>(null) // 地圖寬度
const towerCount = ref<number>(6) // 防禦塔數量
const monsterList = ref<{ monster: Monster; location: number }[]>([]); // 怪物清單
const towerList = ref<any>([]); // 防禦塔清單
const initialBloodVolume = ref(100); // 初始血量
const initialMoney = ref<number>(120) // 初始金錢
const selectedTower = ref<number>(-1) // 選擇的防禦塔
const currentLevel = ref<number>(1) // 現在關卡
const waveCount = ref<number>(50) // 每個關卡出幾次怪

// -- created -- //
let monsterGenerationInterval: any; // 怪物生成
let monsterMovementInterval: any; // 怪物移動
let monsterGenerator: MonsterGenerator //怪物管理器
let towerGenerator: TowerGenerator //防禦塔管理器


// -- mounted -- //
onMounted(() => {
  //* 創建怪物觀察者
  const monsterObserver: MonsterObserver = {
    // 怪物移動
    onMonsterMoved() {
      monsterList.value = monsterGenerator.getMonsterList();
      towerGenerator.attackTower(towerList.value, monsterList.value)
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
    // 怪物遭到擊殺
    onMonsterKilled() {
      initialMoney.value += 5
    }
  };
  //* 創建防禦塔觀察者
  const towerObserver: TowerObserver = {
    // 防禦塔進行攻擊
    OnAttack(towerIndex: number) {
      // 攻擊修改class觸發攻擊特效
      towerList.value[towerIndex].attack = "tower-attack"
      setTimeout(() => {
        towerList.value[towerIndex].attack = ""
      }, towerList.value[towerIndex].tower.attackSpeed * 0.8);
    },
  };

  //* 創建怪物生成器
  monsterGenerator = MonsterGenerator.GetInstance();
  monsterGenerator.addObserver(monsterObserver); // 新增觀察者

  //* 創建防禦塔生成器
  towerGenerator = new TowerGenerator({ mapWidth: mapWidth.value.offsetWidth, towerCount: towerCount.value })
  towerGenerator.addObserver(towerObserver); // 新增觀察者
  towerList.value = towerGenerator.getTowerList()

  startGame(currentLevel.value)
})

// -- method -- //
//* 開始遊戲
function startGame(stage: number) {
  let numberOfMonster: number = 0
  //* 設定怪物生成和移動的間隔時間
  monsterGenerationInterval = setInterval(() => {
    monsterGenerator.generateMonster({ speed: 1, HP: stage * 3, location: 1, nowHP: stage * 3 });
    numberOfMonster++
    if (numberOfMonster >= waveCount.value) {
      clearInterval(monsterGenerationInterval);
      currentLevel.value++
      waveCount.value = currentLevel.value * waveCount.value
      startGame(currentLevel.value)
    }
  }, 1000 / stage);

  monsterMovementInterval = setInterval(() => {
    monsterGenerator.moveMonster();
  }, 20);
}

//* 建造防禦塔
function createTower(index: number): void {
  if (initialMoney.value < 100) {
    return;
  }
  initialMoney.value -= 100;
  towerGenerator.generateTower(1, index, 800)
}

//* 升級防禦塔
function updateTower(methodName: string): void {
  if (selectedTower.value == -1) {
    return
  }
  const updateFactory = new UpdateFactory(methodName, towerList.value[selectedTower.value].tower)
  const result = updateFactory.getResult()
  if (initialMoney.value < result.getUpdateMoney()) {
    return
  }
  result.upgrade()
  initialMoney.value -= result.getUpdateMoney()
}


// 選擇防禦塔
function chooseTower(index: number): void {
  selectedTower.value = index
}

</script>



<style lang="scss">
.td-container {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/photo/backgroung.png");

  .monster-way {
    display: flex;
    margin-top: 5%;
    background-image: url("@/assets/photo/wayy.jpg");
    height: 15%;
    padding: 10px 0;

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
      position: relative;
      width: calc(100%/6);

      .tower-noDisplay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100%;
        min-height: 106px;
        padding: 20px;
      }

      .tower-noDisplay::before {
        content: "+";
        font-size: 30px;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .tower-noDisplay::after {
        content: "$100";
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border: 3px solid;
        border-radius: 10px;
        animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
        0% {
          border-color: #C0C0C0;
          box-shadow: 0 0 5px #C0C0C0;
        }

        50% {
          border-color: #9e9797;
          box-shadow: 0 0 10px #808080;
        }

        100% {
          border-color: #C0C0C0;
          box-shadow: 0 0 5px #C0C0C0;
        }
      }


      img {
        max-height: 100px;
        width: 100%;
        position: relative;
        animation: tower-animation 1s ease-out forwards;
      }

      @keyframes tower-animation {
        0% {
          transform: scale(0);
          opacity: 1;
        }

        50% {
          transform: scale(1);
          opacity: 0.8;
        }

        70% {
          transform: scale(1.1);
        }

        100% {
          transform: scale(1);
          opacity: 1;
        }
      }



      .tower-attack {
        position: relative;
        animation: shake 0.5s alternate;
      }

      @keyframes shake {
        0% {
          transform: translateY(0px);
        }

        50% {
          transform: translateY(-30px);
        }

        100% {
          transform: translateY(0px);
        }
      }
    }

    .tower-select {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

  }

}
</style>
