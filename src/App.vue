<template>
  <el-container>
    <el-header>
    <header-nav></header-nav>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import HeaderNav from '@/components/HeaderNav.vue';

export default {
  name: 'App',
  components:{
    HeaderNav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-nav {
  margin-top: 0;
  padding-top: 0;
}
</style>
