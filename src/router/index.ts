import { createRouter, createWebHistory } from 'vue-router'
import SimpleFactor from '@/views/SimpleFactor.vue'

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
      component: () => import('@/views/StrategyPattern.vue')
    },
    {
      path: '/DecoratorPattern',
      name: 'DecoratorPattern',
      component: () => import('@/views/DecoratorPattern.vue')
    },
    {
      path: '/ProxyPattern',
      name: 'ProxyPattern',
      component: () => import('@/views/ProxyPattern.vue')
    },
    {
      path: '/FactoryMethod',
      name: 'FactoryMethod',
      component: () => import('@/views/FactoryMethod.vue')
    },
    {
      path: '/PrototypePattern',
      name: 'PrototypePattern',
      component: () => import('@/views/PrototypePattern.vue')
    },
    {
      path: '/TemplateMethodPattern',
      name: 'TemplateMethodPattern',
      component: () => import('@/views/TemplateMethodPattern.vue')
    },
    {
      path: '/FacadePattern',
      name: 'FacadePattern',
      component: () => import('@/views/FacadePattern.vue')
    },
    {
      path: '/BuilderPattern',
      name: 'BuilderPattern',
      component: () => import('@/views/BuilderPattern.vue')
    },
    {
      path: '/ObserverPattern',
      name: 'ObserverPattern',
      component: () => import('@/views/ObserverPattern.vue')
    },
    {
      path: '/StatePattern',
      name: 'StatePattern',
      component: () => import('@/views/StatePattern.vue')
    },
    {
      path: '/AdapterPattern',
      name: 'AdapterPattern',
      component: () => import('@/views/AdapterPattern.vue')
    },
    {
      path: '/MementoPattern',
      name: 'MementoPattern',
      component: () => import('@/views/MementoPattern.vue')
    }
  ]
})

export default router
