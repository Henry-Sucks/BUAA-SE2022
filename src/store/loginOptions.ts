import {IUser, User} from './interface'
export default {
    
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