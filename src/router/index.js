import {createRouter,createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView'
import HomePage from '@/views/HomePage'
const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router