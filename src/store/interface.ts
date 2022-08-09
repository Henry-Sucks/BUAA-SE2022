import { dateEquals } from "element-plus";

export interface IUser {
    userId: number,
    userName: String,
    userEmail: String,
    userIcon: String,
    userRealName: String,
    userCareer: String,
    userUnit: String,
    userBirthday: String,
    userLocation: String,
    userUrl: String,
    userPassWord: String
}

export class User implements IUser{
    userId= 0;
    userName= '';
    userEmail= '';
    userIcon= '';
    userRealName= '';
    userCareer= '';
    userUnit= '';
    userBirthday= '2000-01-01';
    userLocation= ''
    userUrl= ''
    userPassWord = ''
}

export interface IGroup {
    groupId: number,
    groupName: String,
    groupInf: String,
    groupIcon: String
}

export class Group implements IGroup{
    groupId= 0;
    groupName= '';
    groupInf= '';
    groupIcon= '';
}

export interface IMember {
    userId: Number,
    groupId: Number,
    userJob: String
}

export class Member implements IMember{
    userId = 0;
    groupId = 0;
    userJob = '';
}