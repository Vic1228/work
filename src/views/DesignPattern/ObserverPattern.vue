<template>
  <div class="layout">
    <h1>觀察者模式</h1>
    <p>增加需通知員工</p>
    <input type="text" v-model="addName">
    <div style="display:flex">
      <button @click="newEmployeeList">增加</button>
      <button @click="notify">通知</button>
    </div>
    <p>目前通知清單</p>
    <span v-for="(ele, idx) in employeeList" :key="idx">{{ ele.name }} <button
        @click="removeEmployeeList(idx)">X</button></span>
  </div>
</template>

<script setup lang="ts">
import { Boss, StockObserver } from "@/models/DesignPattern/ObserverPattern.js";
import { ref } from 'vue'
import type { Ref } from 'vue'

const addName: Ref<string> = ref("Vic")
const employeeList: Ref<any[]> = ref([])

const boss = new Boss("胡汗衫");

// -- method -- //
//* 新增
function newEmployeeList() {
  boss.add(new StockObserver(addName.value, boss.getName()));
  employeeList.value = []
  employeeList.value = boss.getList()
}
//* 刪除
function removeEmployeeList(index: number) {
  boss.remove(index);
  employeeList.value = []
  employeeList.value = boss.getList()
}
//* 通知
function notify() {
  boss.notify("快逃");
}
</script>

<style></style>
