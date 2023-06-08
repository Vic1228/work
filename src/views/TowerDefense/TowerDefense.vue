<template>
  <div class="layout" style="position: relative;">
    <div v-for="bullet in bulletList" :key="bullet.id" class="bullet"
      :style="`left:${bullet.bulletPosition.x}px;top:${bullet.bulletPosition.y}px`"></div>
    <div class="td-container" ref="mapWidth">
      <div class="td-interface">
        <div><img src="@/assets/photo/heart.png">{{ initialBloodVolume }}</div>
        <div><img src="@/assets/photo/dollar.png">{{ initialMoney }}</div>
        <div><img src="@/assets/photo/swords.png">{{ currentLevel }}</div>
      </div>
      <div class="monster-way">
        <div v-for="(ele, idx) in monsterList" :key="idx" class="monster-body">
          <div class="monster-content" :style="'left:' + ele.location + 'px'">
            <div class="health-bar">
              <div class="progress" :style="`width:${ele.nowHP / ele.monster.HP * 100}%`"></div>
            </div>
            <img src="@/assets/photo/monster.png" alt="">
          </div>
        </div>
      </div>
      <div class="tower-space">
        <div v-for="(ele, idx) in towerList" :key="idx" class="tower-body">
          <div @click="chooseTower(idx)" v-if="ele.tower" :class="ele.attack">
            <img class="" src="@/assets/photo/cat.png" alt="">
          </div>
          <div v-else @click="createTower(idx)" class="tower-noDisplay"></div>
        </div>
      </div>
      <div class="information">
        <div v-if="selectedTower != -1" class="information-photoStickers">
          <img src="@/assets/photo/cat.png" alt="Cat Photo">
        </div>
        <div v-if="selectedTower != -1" class="information-details">
          <p class="information-text">等級 {{ towerInfo.level }}</p>
          <p class="information-text">攻擊力 {{ towerInfo.attack }}</p>
          <p class="information-text">攻擊速度{{ towerInfo.attackSpeed }}</p>
        </div>
        <div v-if="selectedTower != -1" class="information-buttons">
          <button @click="updateTower('UpdateLevelTowerDecorator')" class="information-button">升級($100)</button>
          <button @click="updateTower('AttackPowerTowerDecorator')" class="information-button">增加攻擊力($10)</button>
          <button @click="updateTower('AttackSpeedTowerDecorator')" class="information-button">增加攻擊速度($10)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MonsterGenerator, MonsterObserver } from '@/models/TowerDefense/Monster';
import { TowerGenerator, TowerObserver, UpdateFactory } from '@/models/TowerDefense/Tower';



// -- ref -- //
const mapWidth = ref<any>(null) // 地圖寬度
const towerCount = ref<number>(6) // 防禦塔數量
const monsterList = ref<any>([]); // 怪物清單
const towerList = ref<any>([]); // 防禦塔清單
const bulletList = ref<any>([]); //子彈清單
const initialBloodVolume = ref(100); // 初始血量
const initialMoney = ref<number>(150) // 初始金錢
const selectedTower = ref<number>(-1) // 選擇的防禦塔
const currentLevel = ref<number>(1) // 現在關卡
const waveCount = ref<number>(50) // 每個關卡出幾次怪
const towerInfo = ref<any>({}) // 防禦塔資訊欄位

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
      towerGenerator.attackTower(towerList.value, monsterList.value)
      towerGenerator.moveBullets(monsterList.value)
      monsterList.value = monsterGenerator.getMonsterList();
      bulletList.value = towerGenerator.getBulletList()
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
  let numberOfMonster: number = 0 // 怪物目前波數
  //* 設定怪物生成和移動的間隔時間
  monsterGenerationInterval = setInterval(() => {
    monsterGenerator.generateMonster({ speed: 1 + (0.2 * (stage - 1)), HP: stage * 10, location: 1, nowHP: stage * 10 });
    numberOfMonster++
    if (numberOfMonster >= waveCount.value) {
      clearInterval(monsterGenerationInterval);
      clearInterval(monsterMovementInterval);
      currentLevel.value++
      waveCount.value = currentLevel.value * waveCount.value
      startGame(currentLevel.value)
    }
  }, 1000 / stage);

  monsterMovementInterval = setInterval(() => {
    monsterGenerator.moveMonster(mapWidth.value.offsetWidth);
  }, 20);
}

//* 建造防禦塔
function createTower(index: number): void {
  if (initialMoney.value < 100) {
    return;
  }
  initialMoney.value -= 100;
  towerGenerator.generateTower(1, index, 700)
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
  updateTowerInfo(selectedTower.value)
}


// 選擇防禦塔
function chooseTower(index: number): void {
  selectedTower.value = index
  updateTowerInfo(index)
}

//* 更新防禦塔資訊
function updateTowerInfo(index: number): void {
  towerInfo.value = {
    level: towerList.value[index].tower.level,
    attack: towerList.value[index].tower.getAttack(),
    attackSpeed: (1000 / towerList.value[index].tower.attackSpeed).toFixed(3)
  }
}

</script>



<style lang="scss">
button {
  background-color: #003366;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0055a5;
}

.bullet {
  height: 15px;
  width: 15px;
  background-color: #000;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  animation: bulletAnimation 1s infinite alternate;
}

@keyframes bulletAnimation {
  0% {
    transform: scale(1);
    background-color: #000;
    box-shadow: 0 0 5px #000, 0 0 10px rgba(0, 0, 0, 0.5);
  }

  50% {
    transform: scale(1.2);
    background-color: #333;
    box-shadow: 0 0 10px #333, 0 0 15px rgba(0, 0, 0, 0.7);
  }

  100% {
    transform: scale(1);
    background-color: #666;
    box-shadow: 0 0 5px #666, 0 0 10px rgba(0, 0, 0, 0.5);
  }
}



.td-container {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/photo/backgroung.png");

  .td-interface {
    background-color: black;
    width: 120px;
    margin: 15px;
    padding: 10px;
    border-radius: 15px;
    opacity: 0.7;

    div {
      display: flex;
      color: rgba(255, 255, 255, 1);

      img {
        width: 20px;
        margin-right: 10px;
      }
    }
  }

  .monster-way {
    display: flex;
    margin-top: 5%;
    background-image: url("@/assets/photo/wayy.jpg");
    height: 15%;
    padding: 10px 0;
    overflow: hidden;

    .monster-body {
      position: relative;
      height: 100%;

      .monster-content {
        position: absolute;
        height: 100%;

        img {
          height: 100%;
        }

        /* 血條容器 */
        .health-bar {
          width: 100%;
          height: 6px;
          background-color: rgb(94, 94, 94);
          border-radius: 5px;
          overflow: hidden;
        }

        /* 血條進度條 */
        .health-bar .progress {
          height: 100%;
          background-color: rgb(236, 100, 100);
          width: 100%;
        }
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
      top: 80%;
      left: 10%;

      p {
        font-size: 12px;
        color: #430202;
        font-weight: 900;
        text-shadow: 0 0 10px rgb(255, 255, 255);
      }
    }

  }

  .information {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120px;
    background-color: #430202;
    border-top: 2px solid #296b0c;
    padding: 10px;
    box-sizing: border-box;
    color: #ffffff;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  .information-photoStickers {
    margin-right: 10px;
    border: 2px solid #ffffff;
    border-radius: 5px;
    padding: 5px;
  }

  .information-photoStickers img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }

  .information-details {
    flex-grow: 1;
    margin-left: 15px;
    margin-right: 20px;
  }

  .information-text {
    margin: 0;
  }

  .information-buttons {
    display: flex;
    justify-content: center;
  }

  .information-button {
    margin: 0 5px;
    padding: 5px 5px;
    background-color: #296b0c;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: 14px;
  }

  .information-button:hover {
    background-color: #0c5a14;
  }


}
</style>
