<template>
<div class="userInfo">
    <el-row>
    <el-col :span="4">
        <img src='../assets/userDefault.png'>
    </el-col>
    <div class="topper">
    <el-col :span="4" >
    <el-row>
        <span class="fakeName">{{userForm.userName}}</span>
    </el-row>
    </el-col>
    </div>
    </el-row>
    <el-form 
      label-width="120px" 
      jusitfy="center" 
      class="form" 
      :disabled="!isSelf"
      :model="userForm"
      :rules="rules"
      ref="ruleFormRef"
      >
      <el-row>
        <el-form-item label="用户名" prop="fakeName">
          <el-input style = "width:120px" v-model="userForm.userName" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input style = "width:120px" v-model="userForm.userRealName" />
        </el-form-item>
      </el-row>
    <el-form-item label="职位">
      <el-input style = "width:120px" v-model="userForm.userCareer" />
    </el-form-item>
    <el-form-item label="所在公司/学校">
      <el-input style = "width:500px" v-model="userForm.userUnit" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input style = "width:500px" v-model="userForm.userEmail" />
    </el-form-item>
    <el-form-item label="生日">
        <el-date-picker
          v-model="userForm.userBirthday"
          type="date"
          placeholder="Pick a date"
          style="width: 120px"
          value-format="YYYY-MM-DD"
        />
    </el-form-item>
    <el-form-item label="个人网站">
      <el-input style = "width:500px" v-model="userForm.userUrl" />
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input style = "width:500px" v-model="userForm.userLocation" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button 
      @click="submitForm(ruleFormRef)"
      color="#1F80B0"
      >
      更新资料
      </el-button>
    </el-form-item>
  </el-form>
  </div>

</template>

<script lang="ts" setup>
import {reactive, ref, defineProps, getCurrentInstance} from 'vue'
import { FormInstance, FormRules, ElMessageBoxShortcutMethod, ElMessage } from 'element-plus'
import {useStore} from 'vuex'
import {IUser, User} from '../store/interface'


const store = useStore()
const {proxy} = getCurrentInstance()
// 判断是否是本人?
const isSelf = ref(true)

const ruleFormRef = ref<FormInstance>()
console.log(store.state.loginOptions.userInfo)
let userForm = reactive(new User())
userForm = store.state.loginOptions.userInfo


const rules = reactive<FormRules>({
    // email:[
    //     { required: true, message: '请输入邮箱', trigger: 'blur' },
       
    // ],
    // fakeName: [
    //     { required: true, message: '请输入用户名', trigger: 'blur' },
    // ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    console.log(userForm)
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
          proxy.$api.user.updateUser(userForm).then(
              (res) => {
                console.log(res.data.result)
                ElMessage({
                    showClose: true,
                    message: '成功修改信息！',
                    type: 'success',
                })
                store.commit('loginOptions/setUserInfo', userForm)
              }
              
          )
        } else {
        console.log('error submit!', fields)
        }
    })
}
      
const props = defineProps({
  uid: Number
})


</script>

<style scoped>
.userInfo{
  margin-top: 50px
}

img{
  border-radius:50%;
  width: 200px;
  height: 200px;
}

.fakeName{
  font-weight: 700;
  font-size: 45px;
  margin-top: 80px;
  margin-left: 20px;
}

.joinDate{
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 0px;
}

.form{
  font-weight: 700;
  margin-top: 20px;
}

.topper{
  margin-left: 10px;
}

</style>