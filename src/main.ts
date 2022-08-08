import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入后端接口
import api from './api'


const app = createApp(App)

app.config.globalProperties.$api = api


app.use(router).use(ElementPlus).use(store).mount('#app')
