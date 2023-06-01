<template>
  <div class="layout">
    <h1>狀態模式</h1>
    <button @click="StartToWork">開始上班</button>
    <div>
      <button @click="whetherToWorkOvertime(false)">加班</button>
      <button @click="whetherToWorkOvertime(true)">不加班</button>
    </div>

    <p>現在狀態：</p>
    <p>{{ messageDisplay.split(" ")[0] }}</p>
    <p>{{ messageDisplay.split(" ")[1] }}</p>
  </div>
</template>

<script setup lang="ts">
import { Work } from "@/models/StatePattern";
import { ref } from 'vue'
import type { Ref } from 'vue'

const messageDisplay: Ref<string> = ref("")
const emergencyProjects = new Work()

// -- method -- //
function StartToWork() {
  emergencyProjects.State = 9
  const start = setInterval(() => {
    const message = emergencyProjects.WriteProgram()
    messageDisplay.value = message
    emergencyProjects.State++
    if (emergencyProjects.State > 22) {
      clearInterval(start)
    }
  }, 200)
}

function whetherToWorkOvertime(type: boolean) {
  emergencyProjects.Finish = type
}
</script>

<style></style>
