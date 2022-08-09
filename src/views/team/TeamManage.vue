<template>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="7">
          <el-button 
            color="#1F80B0" class="input new-button" round @click="dialogVisible = true"
          >
            新建团队
          </el-button>
          </el-col>
          <el-col :span="8">
            <el-input v-model="searchInput" class="input" placeholder="通过队名搜索团队">
                <template #prefix>
                  <el-icon><search /></el-icon>
                </template>
          </el-input>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row class="main">
            <el-col 
            v-for="data in paginatedData"
            :key="data.tid" 
            :data="data"
            :span="4">
            <team-card class="page-item" @click="enterTeam(data.tid)"  :team="data"></team-card>
            </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :span="7"></el-col>
            <div class="demo-pagination-block">
              <el-pagination
                :hide-on-single-page="ifSinglePage"
                layout="total, prev, pager, next, jumper"
                :total="filteredData.length"
                :page-size="perPage"
                v-model:current-page="curPage"
              />
          </div>
        </el-row>
      </el-footer>
    </el-container>

    <el-dialog
      v-model="dialogVisible"
      title="新建团队">
      <el-input v-model="teamNewName" placeholder="请输入队名"></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createTeam"
          >确认</el-button
        >
      </span>
    </template> 
    </el-dialog>
</template>

<script lang="ts" setup>
import TeamCard from '../../components/TeamCard.vue'
import {reactive, ref, computed, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import { Group } from '@/store/interface';
import {useStore} from 'vuex'

const store = useStore()
const {proxy} = getCurrentInstance()
// 队名输入框
let teamNewName = ref('')

let dialogVisible = ref(false)

// 新增队伍
function createTeam(){
  if(teamNewName.value === ''){
      alert('队名不能为空！')
      return
  }
  else{
    proxy.$api.team.createGroup({userId: store.state.loginOptions.userInfo.userId, name: teamNewName.value}).then((res) => {
      console.log(res)
    })
  }
    
  
}

// 所有数据
const datas = [
            {tid: 1, name:'1', role: 0},{tid: 2, name:'1', role: 1},{tid: 2, name:'1', role: 1},{tid: 2, name:'1', role: 1},{tid: 2, name:'1', role: 1},{tid: 2, name:'1', role: 1}
          ]

// 分页功能
const perPage = ref(12)
// 注意，这里不是index而是页数，从1开始
const curPage = ref(1)
// 搜索群组
let searchInput = ref('')

let totalItems = computed(() => {
    return datas.length;
})

let totalPages = computed(() => {
    console.log(totalPages)
    return datas.length / perPage.value;
})

let ifSinglePage = computed(() => {
    if(totalPages.value > 1)
        return false;
    else
        return true;
})

let paginatedData = computed(() => {
    let start = (curPage.value -1) * perPage.value, end = start + perPage.value
    return filteredData.value.slice(start, end)
})

let filteredData = computed(() => {
    if(searchInput.value !== '')
        return datas.filter(data => data.name.includes(searchInput.value))
    else
        return datas
})

const router = useRouter()
function enterTeam(tid: number){
    router.push({
            name: 'TeamPage',
            params: {
                tid: tid
            }
        })
}
</script>

<style scoped>
.page-item{
  margin-left: 10px;
  margin-bottom: 30px;
}

.page-header{
  margin-top: 20px;
  color:  #1F80B0
}

.input{
  margin-top: 15px;
  margin-bottom: 0px;
  
}

.new-button{
  position:relative;
  left: 150px
}

.main{
  margin-top: 40px;
}
</style>