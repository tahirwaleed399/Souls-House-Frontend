import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/Slices/loader";

export function useGuestGuard() {
  const router = useRouter();
  const dispatch = useDispatch();
  let isAuth = false;
  let user = useMemo(
    () => ({
      activated: false,
    }),
    []
  );
  const setLoaderTrue = useCallback(()=>dispatch(toggleLoader(true)),[dispatch])
  const setLoaderFalse = useCallback(()=>dispatch(toggleLoader(false)),[dispatch])
  useEffect(() => {
  
    if(isAuth && !user.activated){
      setLoaderTrue()

        router.push("/activate");
    }
    if(isAuth && user.activated){
      setLoaderTrue()

        router.push("/rooms");
    }
        
    
        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', setLoaderFalse)

        // unsubscribe from events in useEffect return function
        return () => {
                     router.events.off('routeChangeComplete', setLoaderFalse);
        }

  }, [isAuth, user, router,dispatch,setLoaderFalse,setLoaderTrue]);
}
