import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import router from '@/pages/router'

import AppLayout from '@/layouts/AppLayout.vue'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.component('AppLayout', AppLayout)

app.mount('#app')
