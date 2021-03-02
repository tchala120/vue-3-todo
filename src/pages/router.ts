import { Component } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Todo from '@/pages/Todo.vue'
declare module 'vue-router' {
  interface RouteMeta {
    requiredAuth?: boolean
    layout: Component
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Todo',
    component: Todo,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
