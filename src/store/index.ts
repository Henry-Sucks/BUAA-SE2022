import { dateTableProps } from 'element-plus/lib/components/calendar/src/date-table';
import { createStore } from 'vuex';

import {IUser, User} from './interface'

const loginOptions = {
  namespaced: true,
  actions:{
  },
  mutations:{
      setLoggedIn(state: { loggedIn: boolean; }){
          if(!state.loggedIn){
              state.loggedIn = !state.loggedIn
          }
      },
      setLoggedOut(state: { loggedIn: boolean; }){
          if(!state.loggedIn)
              state.loggedIn = !state.loggedIn
      },
      setUserInfo(state: { userInfo: IUser }, value: IUser){
        state.userInfo = value
      }
  },
  state:{
        // 记录当前是否登录
        loggedIn: false,

        // 记录当前登录用户的所有信息
        userInfo: new User

  }
}

const teamOptions = {
    namespaced: true,
    actions:{
    },
    mutations:{

    },
    state:{
          // 记录当前查看组的基本信息
          teamInfo: {
              tid: 1,
              userName: ''
              // ......
          }
  
    }
  }

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

export default createStore({
  modules:{
      loginOptions,
      teamOptions,
      projectOptions
  }
})