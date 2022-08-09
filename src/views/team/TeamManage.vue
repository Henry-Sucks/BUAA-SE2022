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
            :key="data.groupId" 
            :data="data"
            :span="4">
            <team-card class="page-item" @click="enterTeam(data.groupId)"  :team="data"></team-card>
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
import {reactive, ref, computed, getCurrentInstance, toRefs, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import { Group, IGroup } from '@/store/interface';
import {useStore} from 'vuex'

const store = useStore()
const {proxy} = getCurrentInstance()


// 队名输入框
let teamNewName = ref('')

// 控制队名输入框什么时候跳出
let dialogVisible = ref(false)


// 所有组的数据
// 注意：对象数组的响应式绑定
let datas = reactive(
  [] as IGroup[]
)

// 获取/刷新该组员参加的所有组 datas
function refreshData(){
  proxy.$api.team.findUserGroup(store.state.loginOptions.userInfo.userId).then((res) =>{
    // 为了保持datas的双向绑定式，数组赋值时必须一个一个添加，这里调用copyArray函数
    copyArray(res.data.data, datas)
    console.log('总数据', datas)
}
)
}

onMounted(() => {
  // mounted生命钩子：初始化
    refreshData()
})


// 新增团队
function createTeam(){
  if(teamNewName.value === ''){
      alert('队名不能为空！')
      return
  }
  else{
    proxy.$api.team.createGroup({userId: store.state.loginOptions.userInfo.userId, name: teamNewName.value}).then((res) => {
      dialogVisible.value = false
      refreshData()
    })
  }
    
}

// 复制数组
function copyArray(sourceArray: any[], destinationArray: any[])
{
destinationArray.length = 0
destinationArray.push(...sourceArray)
}




// 分页功能
const perPage = ref(12)
// 注意，这里不是index而是页数，从1开始
const curPage = ref(1)
// 搜索群组
let searchInput = ref('')
// 全部内容长度
let totalItems = computed(() => {
    return datas.length;
})
// 全部页数
let totalPages = computed(() => {
    console.log(totalPages)
    return datas.length / perPage.value;
})
// 是否只有一页？是则隐藏页数栏
let ifSinglePage = computed(() => {
    if(totalPages.value > 1)
        return false;
    else
        return true;
})

// 根据搜索栏对内容进行过滤
let filteredData = computed(() => {
    if(searchInput.value !== '')
        return datas.filter(data => data.groupName.includes(searchInput.value))
    else
        return datas
})

// 对过滤后的内容进行分页处理，最后展示的就是这个内容
let paginatedData = computed(() => {
    let start = (curPage.value -1) * perPage.value, end = start + perPage.value
    console.log('最终处理结果', filteredData.value.slice(start, end))
    return filteredData.value.slice(start, end)
})



const router = useRouter()
// 传参并进入teamPage
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