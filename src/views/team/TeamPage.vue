<template>
    <div>
        <!-- 返回按钮 -->
        <el-page-header class="page-header" :content="'团队管理界面'" title="返回" @back="goBack"/>
        
        <!-- header，只用向里传入团队名字 -->
        <team-header :team-name="teamInfo.groupName"></team-header>
        <el-tabs
            type="card"
            class="demo-tabs"
        >
            <!-- 向里传入当前所查看的团队id，具体信息在组件内部获得参数后再请求 -->
            <el-tab-pane label="团队成员" name="first">
                <member-table :tid="store.state.teamOptions.tid"></member-table>
            </el-tab-pane>
            <el-tab-pane label="团队项目" name="second">
                <project-manage :tid="store.state.teamOptions.tid"></project-manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import TeamHeader from '../../components/teams/TeamHeader.vue'
import MemberTable from '../../components/teams/MemberTable.vue'
import ProjectManage from '../projects/ProjectManage.vue'
import {reactive, getCurrentInstance, ref} from "vue"
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'

import {Group} from '../../store/interface'
const router = useRouter()
const store = useStore()
const {proxy} = getCurrentInstance()


// 通过路由传参，得到该组的tid后查询信息
const tid = ref(router.currentRoute.value.params.tid)
// 将tid储存在vuex里
store.commit('teamOptions/setTid', tid)
// group自身信息，注意使用ref去接收一个对象，便于后面的直接赋值而又不失去响应性
let teamInfo = ref(new Group())
let groupId = ref(0)
proxy.$api.team.getGroupById(tid.value).then((res) => {
    
    // 直接赋值
    teamInfo.value = res.data.data
    groupId.value = res.data.data.groupId
    console.log(teamInfo.value)
})


// 往前退一页
function goBack(){
    router.go(-1)
}
</script>

<style scoped>
.page-header{
    position: relative;
    top: 30px;
    margin-bottom: 50px;
}
</style>