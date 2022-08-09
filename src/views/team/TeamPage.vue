<template>
    <div>
        <el-page-header class="page-header" :content="'团队管理界面:'" title="返回" @back="goBack"/>
        <team-header></team-header>
        <el-tabs
            type="card"
            class="demo-tabs"
        >
            <el-tab-pane label="团队成员" name="first">
                <member-table></member-table>
            </el-tab-pane>
            <el-tab-pane label="团队项目" name="second">
                <project-manage :tid="teamInfo.tid"></project-manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import TeamHeader from '../../components/teams/TeamHeader.vue'
import MemberTable from '../../components/teams/MemberTable.vue'
import ProjectManage from '../projects/ProjectManage.vue'
import {reactive} from "vue"
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'

import {Group} from '../../store/interface'
const router = useRouter()
const store = useStore()

// 得到该组的完整信息
let teamInfo = reactive(new Group)
teamInfo = store.state.teamOptions.teamInfo


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