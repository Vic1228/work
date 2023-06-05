<template>
  <div class="layout">
    <h1>外觀模式</h1>
    <button @click="buyStock" style="margin:10px 0">買進</button>
    <button @click="sellStock">賣出</button>
    <p>交易紀錄</p>
    <div class="transactionRecords">
      <div v-for="(ele, idx) in transactionRecords" :key="idx">
        <p>{{ ele.date }}</p>
        <p>{{ ele.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StockTradingProgram } from "@/models/DesignPattern/FacadePattern.js";
import { ref } from 'vue'
import type { Ref } from 'vue'


// -- ref -- //
const transactionRecords: Ref<any[]> = ref([])

// -- created -- //
const program = new StockTradingProgram()

// -- method -- //
function buyStock(): void {
  const stockData = {
    date: new Date(),
    content: program.buy()
  }
  transactionRecords.value.push(stockData)
}
function sellStock(): void {
  const stockData = {
    date: new Date(),
    content: program.sell()
  }
  transactionRecords.value.push(stockData)
}



</script>

<style>
input {
  margin: 7px 0
}

.transactionRecords {
  height: 180px;
  overflow: auto;
}
</style>
