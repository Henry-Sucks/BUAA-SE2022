<template>
    <div>
        <el-page-header class="page-header" content='项目管理界面' title="返回" @back="goBack"/>
        <!-- 传入项目名称 -->
        <team-header teamName="你好"></team-header>
        <el-tabs
            type="card"
            class="demo-tabs"
        >
            <el-tab-pane label="文档" name="first">
                <file-manage></file-manage>
            </el-tab-pane>
            <el-tab-pane label="原型设计" name="second">
                <span>敬请期待~</span>
            </el-tab-pane>
            <el-tab-pane label="UML图绘制" name="third">
                <span>敬请期待~</span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue"
import ProjectHeader from '../../components/projects/ProjectHeader.vue'
import { useRouter } from 'vue-router';
const router = useRouter()

// 得到该项目的完整信息：放在vuex上



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