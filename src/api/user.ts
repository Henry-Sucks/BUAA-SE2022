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
            data
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