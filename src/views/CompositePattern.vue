<template>
  <div class="layout">
    <h1>組合模式</h1>
  </div>
</template>

<script setup lang="ts">
import { ConcreteCompany, HRDepartment, FinanceDepartment } from "@/models/CompositePattern";

const root = new ConcreteCompany('北京總公司')
root.Add(new HRDepartment('總公司人力資源部'))
root.Add(new FinanceDepartment('總公司財務部'))

const comp = new ConcreteCompany('上海華東分公司')
comp.Add(new HRDepartment('華東分公司人力資源部'))
comp.Add(new FinanceDepartment('華東分公司財務部'))
root.Add(comp)

const comp1 = new ConcreteCompany('南京辦事處')
comp1.Add(new HRDepartment('南京辦事處人力資源部'))
comp1.Add(new FinanceDepartment('南京辦事處財務部'))
comp.Add(comp1)

const comp2 = new ConcreteCompany('杭州南京辦事處')
comp2.Add(new HRDepartment('南京代表處人力資源部'))
comp2.Add(new FinanceDepartment('南京代表處財務部'))
comp.Add(comp2)

console.log('結構圖')
root.Display(1)

console.log('職責')
root.LineOfDuty()

</script>

<style></style>
