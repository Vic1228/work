<template>
  <div class="layout">
    <h1>策略模式</h1>
    <input type="number" v-model="num1">
    <input type="number" v-model="num2" style="margin:15px 0">
    <select v-model="operator">
      <option value="正常收費">正常收費</option>
      <option value="滿300送100">滿300送100</option>
      <option value="打8折">打8折</option>
    </select>
    <p>{{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import { PricingStrategyFactory } from "@/models/DesignPattern/StrategyPattern.js";
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// -- ref -- //
const num1: Ref<number> = ref(0);
const num2: Ref<number> = ref(1);
const operator: Ref<string> = ref("正常收費");
const result: Ref<number> = ref(0)

// -- watch -- //
watch([num1, num2, operator], (nV, oV) => {
  const oldOperator = oV[2];
  calc(oldOperator)
})

// -- method -- //
function calc(oldOperator: string): void {
  try {
    const pricingStrategy = new PricingStrategyFactory(operator.value)
    result.value = pricingStrategy.getResult(num1.value, num2.value)
  } catch (e) {
    operator.value = oldOperator
    alert(e)
    return
  }
}

</script>

<style></style>
