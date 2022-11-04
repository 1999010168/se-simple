import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as echarts from 'echarts'

const app = createApp(App).use(ElementPlus).use(router).mount('#app')
app.echarts = echarts
