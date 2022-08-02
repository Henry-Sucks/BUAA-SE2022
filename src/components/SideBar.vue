<template>
    <el-menu
        default-active="0"
        class="SideBar"
        :collapse="collapsed"
        @open="handleOpen"
        text-color="#1F80B0"
        active-text-color="#144B66"
        >
    <el-sub-menu index="0">
        <template #title>
            <el-image class="nav-icon" :class="{'collapsed' : collapsed}" :src="teamManage" style="width: 30px;"></el-image>
            <span>管理团队</span>
        </template>
    </el-sub-menu>    
    <el-sub-menu index="1">
        <template #title>
            <el-image class="nav-icon" :class="{'collapsed' : collapsed}" :src="teamWork" style="width: 30px;"></el-image>
            <span>管理项目</span>
        </template>
    </el-sub-menu>    
    </el-menu>
</template>

<script>
const teamManage = require('../assets/teamManage.svg')
const teamWork = require('../assets/teamWork.svg')
export default {
    name: 'SideBar',

    data() {
        return {
            // 资源
            teamManage, teamWork,

            collapsed: true
        }
    },

    methods: {
        handleOpen(){
            if(this.collapsed)
                this.collapsed = false
        },
        handleClose(){
            if(this.collapsed)
                this.collapsed = true
        }
    },
}
</script>

<style>
.nav-icon{
    margin-bottom: 30px;
    margin-right: 30px;
    transition: all 1s ease-in-out;
}

.nav-icon.collapsed{
    margin-right: 0px;
}

/* .nav-icon:hover{
    transform: rotate(90deg);
    transform-origin: 50% 50%;
} */
</style>