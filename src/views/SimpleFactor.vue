<template>
  <div class="layout">
    <h1>簡單工廠測試</h1>
    <input type="number" v-model="num1">
    <select v-model="operator" style="margin:15px 0">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
      <option value="X">X</option>
    </select>
    <input type="number" v-model="num2">
    <p>{{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import { OperationFactory } from "@/models/SimpleFactor";
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// -- ref -- //
const num1: Ref<number> = ref(0);
const num2: Ref<number> = ref(0);
const operator: Ref<string> = ref("+");
const result: Ref<number> = ref(0)

// -- watch -- //
watch([num1, num2, operator], (nV, oV) => {
  const oldOperator = oV[2];
  calc(oldOperator)
})

// -- method -- //
function calc(oldOperator: string): void {
  try {
    const Operation = OperationFactory.createOperation(operator.value);
    const product = Operation.calculate(num1.value, num2.value);
    result.value = product;
  } catch (e) {
    operator.value = oldOperator
    alert(e)
    return
  }
}
</script>

<style>
</style>