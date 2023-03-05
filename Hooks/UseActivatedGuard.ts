import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/Slices/loader";

export function useActivatedGuard() {
  const router = useRouter();
  const dispatch = useDispatch();
  let isAuth = true;
  let user = useMemo(
    () => ({
      activated: false,
    }),
    []
  );
  const setLoaderTrue = useCallback(()=>dispatch(toggleLoader(true)),[dispatch])
  const setLoaderFalse = useCallback(()=>dispatch(toggleLoader(false)),[dispatch])
  useEffect(() => {

    if(!isAuth && !user.activated){
    setLoaderTrue();

        router.push("/");
    }
    if(isAuth && !user.activated){
    setLoaderTrue();
    console.log('gonna run thsi');
    

        router.push("/activate");
    }
    
        
    
        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', setLoaderFalse)

        // unsubscribe from events in useEffect return function
        return () => {
                     router.events.off('routeChangeComplete', setLoaderFalse);
        }

  }, [isAuth, user, router,dispatch,setLoaderFalse,setLoaderTrue]);
}
