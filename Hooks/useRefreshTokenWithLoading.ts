// import { useRefreshTokensQuery } from "@/apis/authApi";
// import { User } from "@/Interfaces/User";
// import { setUser } from "@/Slices/auth";
// import { toggleLoader } from "@/Slices/loader";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// export function useRefreshTokenWithLoading(){
//     const  state  = useRefreshTokensQuery();
//     const dispatch = useDispatch();
//     useEffect(()=>{
//      if(state.isLoading)   {
//         dispatch(toggleLoader(true));
//      }
// if(state.isSuccess){
//     dispatch(toggleLoader(false));
//     const user : User = state.data.data.user ;
//     dispatch(setUser(user));

// }
// if(state.isError){
//     dispatch(toggleLoader(false));

// }

        
//     },[
//         state,
//         dispatch
//     ])

//     return {state};
// }