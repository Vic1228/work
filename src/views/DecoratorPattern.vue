<template>
  <div class="layout">
    <h1>裝飾模式</h1>
    <input type="text" v-model="name">
    <p>{{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import * as DecoratorPattern from "@/models/DecoratorPattern";
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

// -- ref -- //
const name: Ref<string> = ref("Vic");
const result: Ref<string> = ref("")

calc()

// -- watch -- //
watch(name, () => {
  calc()
})

// -- method -- //
function calc() {
  try {
    const newName = new DecoratorPattern.person(name.value);
    const withTShirt = new DecoratorPattern.tShirt(newName);
    const withSuit = new DecoratorPattern.suit(withTShirt);
    const classResult = withSuit.show();
    result.value = classResult;

  } catch (e) {
    alert(e)
    return
  }
}

</script>

<style>
</style>
