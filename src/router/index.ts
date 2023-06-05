import { createRouter, createWebHistory } from 'vue-router'
import SimpleFactor from '@/views/DesignPattern/SimpleFactor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SimpleFactor',
      component: SimpleFactor
    },
    {
      path: '/StrategyPattern',
      name: 'StrategyPattern',
      component: () => import('@/views/DesignPattern/StrategyPattern.vue')
    },
    {
      path: '/DecoratorPattern',
      name: 'DecoratorPattern',
      component: () => import('@/views/DesignPattern/DecoratorPattern.vue')
    },
    {
      path: '/ProxyPattern',
      name: 'ProxyPattern',
      component: () => import('@/views/DesignPattern/ProxyPattern.vue')
    },
    {
      path: '/FactoryMethod',
      name: 'FactoryMethod',
      component: () => import('@/views/DesignPattern/FactoryMethod.vue')
    },
    {
      path: '/PrototypePattern',
      name: 'PrototypePattern',
      component: () => import('@/views/DesignPattern/PrototypePattern.vue')
    },
    {
      path: '/TemplateMethodPattern',
      name: 'TemplateMethodPattern',
      component: () => import('@/views/DesignPattern/TemplateMethodPattern.vue')
    },
    {
      path: '/FacadePattern',
      name: 'FacadePattern',
      component: () => import('@/views/DesignPattern/FacadePattern.vue')
    },
    {
      path: '/BuilderPattern',
      name: 'BuilderPattern',
      component: () => import('@/views/DesignPattern/BuilderPattern.vue')
    },
    {
      path: '/ObserverPattern',
      name: 'ObserverPattern',
      component: () => import('@/views/DesignPattern/ObserverPattern.vue')
    },
    {
      path: '/StatePattern',
      name: 'StatePattern',
      component: () => import('@/views/DesignPattern/StatePattern.vue')
    },
    {
      path: '/AdapterPattern',
      name: 'AdapterPattern',
      component: () => import('@/views/DesignPattern/AdapterPattern.vue')
    },
    {
      path: '/MementoPattern',
      name: 'MementoPattern',
      component: () => import('@/views/DesignPattern/MementoPattern.vue')
    },
    {
      path: '/CompositePattern',
      name: 'CompositePattern',
      component: () => import('@/views/DesignPattern/CompositePattern.vue')
    },
    {
      path: '/SingletonPattern',
      name: 'SingletonPattern',
      component: () => import('@/views/DesignPattern/SingletonPattern.vue')
    },
    {
      path: '/BridgePattern',
      name: 'BridgePattern',
      component: () => import('@/views/DesignPattern/BridgePattern.vue')
    },
    {
      path: '/ChainOfResponsibilityPattern',
      name: 'ChainOfResponsibilityPattern',
      component: () => import('@/views/DesignPattern/ChainOfResponsibilityPattern.vue')
    },
    {
      path: '/FlyweightPattern',
      name: 'FlyweightPattern',
      component: () => import('@/views/DesignPattern/FlyweightPattern.vue')
    },
    {
      path: '/TowerDefense',
      name: 'TowerDefense',
      component: () => import('@/views/TowerDefense/TowerDefense.vue')
    },
  ]
})

export default router
