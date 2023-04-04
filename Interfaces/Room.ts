import { User } from "./User";

export interface Room {
    id : string ;
    speakers :[User];
    owner : User ;
    topic: string;
    type : string ;
    createdAt : Date;
    
}