<template>
  <el-container>
    <el-aside width="200px">
        <side-bar></side-bar>
    </el-aside>
  </el-container>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
    name: 'HomePage',
    components: {
        SideBar
    }

}
</script>

<style>

</style>