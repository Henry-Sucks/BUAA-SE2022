<template>
    <el-row class="header">
        <el-button 
        color="#1F80B0" :icon="Plus" round @click="addVisible = true"
        >
        邀请用户
        </el-button>
        <el-button 
        type="danger" :icon="Delete" round @click="deleteVisible = true"
        >
        解散团队
        </el-button>
    </el-row>
    <el-table :data="memberData" style="width: 100%">
        <el-table-column label="成员">
            <template #default="scope">
                <!-- <span class="text">{{getUserName(scope.row.userId)}}</span> -->
                <span class="text">{{scope.row.userName}}</span>
                <span class="text" v-if="scope.row.userId == uid">（您）</span>
                <img class="pic" :src="getRoleTag(scope.row.userId, tid)" style="width:50px; ">
            </template>
        </el-table-column>
        <el-table-column label="成员邮箱">
            <template #default="scope">
                <span class="text">{{scope.row.userEmail}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="default" type="success" round v-if="selfRole !== 'member' && tempRole === 'member'"
                >任命管理员
                </el-button>
                <el-button size="default" type="warning" round v-if="selfRole === 'founder' && tempRole === 'admin'"
                >解除管理员
                </el-button>
                <el-button size="default" type="danger" round v-if="selfRole === 'founder' && tempRole !== 'founder'"
                >移出团队
                </el-button>
            </template>
        </el-table-column>
    </el-table>


    <el-dialog
    v-model="deleteVisible"
    title="解散这个团队"
    width="30%"
  >
    <span>您确认要解散这个团队吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteGroup"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="addVisible"
    title="添加组员"
    width="30%"
  >
    <el-input v-model="addInput" placeholder="请输入组员邮箱..."></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="addUserToGroup"
          >确认添加</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  Delete,
  Plus
} from '@element-plus/icons-vue'
import { composeEventHandlers } from 'element-plus/es/utils';

import {reactive, getCurrentInstance, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {IMember} from '../../store/interface'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'

const {proxy} = getCurrentInstance()
const router = useRouter() 
const store = useStore()

let deleteVisible = ref(false)
let addVisible = ref(false)

let addInput = ref('')

// 该登录用户的id
const uid = store.state.loginOptions.userInfo.userId

const props = defineProps({
    tid: Number 
})

console.log('MemberTable', props.tid)
// 获取团队内所有成员信息
let memberData = reactive(
    [] as IMember[]
)

onMounted(() => {
    refreshData()
})

// 刷新数据
function refreshData(){
    proxy.$api.team.getUserInGroup(props.tid).then((res) => {
    copyArray(res.data.data, memberData)
    console.log("memberData", memberData)
    })
}
    



// 复制数组
function copyArray(sourceArray: any[], destinationArray: any[])
{
destinationArray.length = 0
destinationArray.push(...sourceArray)
}

// 得到成员信息
// 注意：vue有一个特性，template中要展现的数据不能来自一个异步函数，比如axios。因此想要使用它得像checkJob中，先使用async和await关键词(可以看B站)，在给一个临时变量性质的全局变量去赋值，最后取那个全员变量的值就可以了
// 记录成员信息的临时变量
let tempRole = ref('')
let selfRole = ref('')
async function checkJob(userId: number, groupId: number){
    let res = await proxy.$api.team.checkJob(userId, groupId)
    tempRole.value = res.data.data
    if(userId == store.state.loginOptions.userInfo.userId)
        selfRole.value = res.data.data
}

// 通过成员信息得到teamTag
function getRoleTag(userId: number, groupId: number){
    console.log('getRoleTag', userId, groupId)
    checkJob(userId, groupId)
    if(tempRole.value === 'founder')
        return require('../../assets/team/teamTag0.png')
    else if(tempRole.value === 'admin')
        return require('../../assets/team/teamTag1.png')
    else if(tempRole.value === 'member')
        return require('../../assets/team/teamTag2.png')
    else
        return null
}

// function getRole(userId: number, groupId: number){
//     console.log('getRole', userId, groupId)
//     checkJob(userId, groupId)
//     return tempRole.value
// }

// 删除团队
function deleteGroup(){
    // 团队id：props.tid

    // 返回一个界面
    router.go(-1)

    // 跳出信息
    ElMessage({
    message: '您已成功删除！',
    type: 'success',
  })
}

// 添加用户
function addUserToGroup(){
    // 通过邮箱找ID
    proxy.$api.user.findEmail(addInput).then((res) => {
        if(!res.data.result){
            alert('这名用户尚未注册，快去邀请他吧！')
            return
        }
        else{
            // 添加用户
            let userId = res.data.data.userId
            proxy.$api.team.addUserToGroup(userId, props.tid).then((res) => {
                ElMessage({
                    message: '您已成功添加该用户！',
                    type: 'success',
                })

                // 刷新数据
                refreshData()
            })
            
        }
    })
}

</script>
<style scoped>
.header{
    margin-bottom: 15px;
}

.pic{
    position: relative;
    top: 5px;
    left: 20px;
}
</style>