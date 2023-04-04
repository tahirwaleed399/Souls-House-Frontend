export interface User {
    email : String ;
    activated : Boolean;
    id : String ;
    createdAt : Date;
    profile : Image | null;
    name : String;
}

type Image =  {
     url : String;
     public_id : String;
}