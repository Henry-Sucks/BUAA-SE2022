import {Group, User} from '@/store/interface'
import request from "./request"

export async function addUserToGroup(data: any){
    return request({
        method: 'POST',
        url: `/group/addUser`,
        params:{
            userId: data.userId,
            groupId: data.groupId,
            job: data.userJob
        }
    })
}

export async function deleteUser(data: any){
    return request({
        method: 'DELETE',
        url: `/group/deleteUser`,
        params:{
            userId: data.userId,
            groupId: data.groupId,
            job: data.userJob
        }
    })
}

export async function changePos(data: any){
    return request({
        method: 'POST',
        url: `/group/changePos`,
        params:{
            userId: data.userId,
            groupId: data.groupId,
            job: data.userJob
        }
    })
}

export async function getUserInGroup(groupId: number){
    return request({
        method: 'GET',
        url: `/group/UserinGroup`,
        params:{
            groupId: groupId
        }
    })
}

export async function createGroup(data:any) {
    return request({
        method: 'POST',
        url: '/group/createGroup',
        params:{
            userId: data.userId,
            name: data.name
        }
    })
}