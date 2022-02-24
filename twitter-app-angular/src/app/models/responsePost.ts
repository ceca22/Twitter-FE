import { User } from "./User";

export class ResponsePost{
    id:number;
    userFullName :string; 
    text:string;
    image:string;
    user:User;
    datePosted:Date;
}