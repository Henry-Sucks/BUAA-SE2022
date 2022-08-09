import {IGroup, Group} from './interface'
export default {
    namespaced: true,
    actions:{
    },
    mutations:{
      setTid(state: { tid: Number }, tid: Number){
            if(state.tid == 0){
                state.tid = tid
            }
        },
    },
    state:{
          tid: 0
    }
  }