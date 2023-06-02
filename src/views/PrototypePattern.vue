<template>
  <div class="layout">
    <h1>原型模式</h1>
    <input type="text" placeholder="名字" v-model="nowResumeContent.name">
    <input type="text" placeholder="性別" v-model="nowResumeContent.gender">
    <input type="text" placeholder="年紀" v-model="nowResumeContent.age">
    <input type="text" placeholder="工作經歷時間" v-model="nowResumeContent.timeArea">
    <input type="text" placeholder="公司名稱" v-model="nowResumeContent.company">
    <button @click="cloneResume">複製</button>
    <p v-for="(ele, idx) in newResumeArray" :key="idx">{{ ele }}</p>
  </div>
</template>

<script setup lang="ts">
import { Resume } from "@/models/PrototypePattern";
import { ref } from 'vue'
import type { Ref } from 'vue'

interface ResumeInterface {
  [key: string]: string;
}

// -- ref -- //
const nowResumeContent: Ref<ResumeInterface> = ref({
  name: "Vic",
  gender: "男",
  age: "28",
  timeArea: "2020-2023",
  company: "XX公司"
});
const newResumeArray: Ref<string[]> = ref([]);

// -- created -- //
const resume = new Resume(nowResumeContent.value.name)
resume.setPersonalInfo(nowResumeContent.value.gender, nowResumeContent.value.age)
resume.setWorkExperience(nowResumeContent.value.timeArea, nowResumeContent.value.company)
newResumeArray.value.push(resume.display())

// -- methods -- //
function cloneResume() {
  const cloneResume = resume.clone()
  for (const key in nowResumeContent.value) {
    if (nowResumeContent.value[key] != cloneResume[key as keyof Resume]) {
      switch (key) {
        case "name":
          cloneResume.setName(nowResumeContent.value.name)
          break;
        case "gender":
        case "age":
          cloneResume.setPersonalInfo(nowResumeContent.value.gender, nowResumeContent.value.age)
          break;
        case "timeArea":
        case "company":
          cloneResume.setWorkExperience(nowResumeContent.value.timeArea, nowResumeContent.value.company)
          break;
        default:
          break;
      }
    }
  }
  newResumeArray.value.push(cloneResume.display())
}

</script>

<style>
input {
  margin: 7px 0
}
</style>
