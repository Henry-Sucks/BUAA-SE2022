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
    userUrl: String
}

export class User implements IUser{
    userId= 0;
    userName= '';
    userEmail= '';
    userIcon= '';
    userRealName= '';
    userCareer= '';
    userUnit= '';
    userBirthday= '';
    userLocation= ''
    userUrl= ''
}
