import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "@/Slices/loader";
import { getUser } from "@/Slices/auth";
import { User } from "@/Interfaces/User";

export function useAuthenticatedGuard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user: User | null  = useSelector(getUser);

  const setLoaderTrue = useCallback(()=>dispatch(toggleLoader(true)),[dispatch])
  const setLoaderFalse = useCallback(()=>dispatch(toggleLoader(false)),[dispatch])
  useEffect(() => {
 
    

      if(!user ){
        dispatch(toggleLoader(true));
    
          router.push("/");
      } 
        if(user && user.activated){
   
        dispatch(toggleLoader(true));
    
            router.push("/rooms");
        }
 
   
    
        
    
        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', setLoaderFalse)

        // unsubscribe from events in useEffect return function
        return () => {
                     router.events.off('routeChangeComplete', setLoaderFalse);
        }

  }, [ user, router,dispatch,setLoaderFalse,setLoaderTrue]);
}
