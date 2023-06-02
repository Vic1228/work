<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="設計模式練習用" />

      <nav>
        <RouterLink to="/">簡單工廠</RouterLink>
        <RouterLink to="/StrategyPattern">策略模式</RouterLink>
        <RouterLink to="/DecoratorPattern">裝飾模式</RouterLink>
        <RouterLink to="/ProxyPattern">代理模式</RouterLink>
        <RouterLink to="/FactoryMethod">工廠方法模式</RouterLink>
        <RouterLink to="/PrototypePattern">原型模式</RouterLink>
        <RouterLink to="/TemplateMethodPattern">範本方法模式</RouterLink>
        <RouterLink to="/FacadePattern">外觀模式</RouterLink>
        <RouterLink to="/BuilderPattern">建造者模式</RouterLink>
        <RouterLink to="/ObserverPattern">觀察者模式</RouterLink>
        <RouterLink to="/StatePattern">狀態模式</RouterLink>
        <RouterLink to="/AdapterPattern">轉接器模式</RouterLink>
        <RouterLink to="/MementoPattern">備忘錄模式</RouterLink>
        <RouterLink to="/CompositePattern">組合模式</RouterLink>
        <RouterLink to="/SingletonPattern">獨體模式</RouterLink>
        <RouterLink to="/BridgePattern">橋接模式</RouterLink>
        <RouterLink to="/ChainOfResponsibilityPattern">職責鏈模式</RouterLink>
        <RouterLink to="/FlyweightPattern">享元模式</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  width: 50%;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
