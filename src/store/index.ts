import { dateTableProps } from 'element-plus/lib/components/calendar/src/date-table';
import { createStore } from 'vuex';

import teamOptions from './teamOptions'

import loginOptions from './loginOptions'


import VuexPersistence from 'vuex-persist'





const projectOptions ={
    namespaced: true,
    actions:{},
    mutations:{},
    state:{
        // 记录当前查看项目的基本信息
        projectInfo: {
            pid: 1
        }
    }
}

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default createStore({
  strict: false,
    modules:{
      loginOptions,
      teamOptions,
      projectOptions
  },
  plugins: [vuexLocal.plugin]
})