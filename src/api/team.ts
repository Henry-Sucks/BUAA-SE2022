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

export async function findUserGroup(userId: number){
    return request({
        method: 'GET',
        url: '/group/findUser',
        params:{
            userId: userId
        }
    })
}

export async function getGroupById(groupId: Number) {
    return request({
        method: 'GET',
        url: '/group/findId',
        params:{
            groupId: groupId
        }
    })
}

export async function checkJob(userId: number, groupId: Number) {
    return request({
        method: 'GET',
        url: '/group/checkJob',
        params:{
            groupId, 
            userId
        }
    })
}