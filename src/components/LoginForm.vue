<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="80px"
    class="registerForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button 
      @click="submitForm(ruleFormRef)"
      color="#1F80B0"
      >
      登录
      </el-button>
      <el-button 
      @click="register"
      color="#1F80B0"
      >
      注册
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import {reactive, ref, getCurrentInstance} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'
import {User} from '../store/interface'

// 获取当前实例以使用其中的api
const { proxy } = getCurrentInstance()

const router = useRouter()
const store = useStore()

const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    email: '',
    password: '',
})

const rules = reactive<FormRules>({
    email:[
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message:'请输入正确的邮箱格式', trigger:'blur'}
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    let flag = false
    let uid: number
    let userInfo: any
    await formEl.validate(async (valid, fields) => {
        if (valid) {
          // 是否正确登入？
          const params =
          {
            userEmail : ruleForm.email,
            passWord : ruleForm.password
          }
          await proxy.$api.user.loginByEmail(params).then((res) => {
            if(res.data.result == false){
              alert('输入信息有误！')
              flag = true
            }
            })
          if(flag) return
          
          // 获取用户信息放入全局信息
          await proxy.$api.user.findEmail(ruleForm.email).then((res) => {
            if(res.data.result == false){
              alert('出现错误！')
              flag = true
            }
            else{
              userInfo = res.data.data
            }
            console.log(res.data.result)
            })
          if(flag)  return


          store.commit('loginOptions/setUserInfo', userInfo)
          store.commit('loginOptions/setLoggedIn')
          router.push({
                name: 'HomePage'
              })
        } else {
        console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const register = () => {
      router.push({
        path: 'register'
      })
}

</script>
<style scoped>
.registerForm{
  margin-top: 50px;

}

button{
  width: 100px;
  height: 40px;
  margin-top: 15px;
}
</style>