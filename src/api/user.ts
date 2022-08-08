import { User } from "@/store/interface"
import request from "./request"

export async function findEmail(email:string){
    return request({
        method: 'GET',
        url: `/user/findEmail`,
        params:{
            userEmail: email
        }
    })
}

export async function findName(name:String){
    return request({
        method: 'GET',
        url: `/user/findName/`,
        params:{
            userName: name
        }
    })
}

export async function addUser(data: any){
    return request({
        method: 'POST',
        url: '/user/addUser',
        params:{
            userName: data.userName,
            Email: data.Email,
            passWord: data.PassWord
        }
    })
}

export async function loginByEmail(data: any){
    return request({
        method: 'GET',
        url: '/user/loginByEmail',
        params:{
            userEmail: data.userEmail,
            passWord: data.passWord
        }
    })
}

export async function updateUser(data: User){
    return request({
        method: 'POST',
        url: '/user/update',
        params:{
            userId : data.userId, 
            userName : data.userName, 
            userEmail : data.userEmail,
            userPassWord : data.userPassWord,
            userIcon : data.userIcon, 
            userRealName : data.userRealName,
            userCareer : data.userCareer, 
            userUnit : data.userUnit,
            userBirthday : data.userBirthday,
            userLocation : data.userLocation,
            userUrl : data.userUrl,
        }
    })
}