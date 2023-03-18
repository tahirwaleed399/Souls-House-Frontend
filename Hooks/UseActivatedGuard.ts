import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "@/Slices/loader";
import { getUser } from "@/Slices/auth";
import { User } from "@/Interfaces/User";

export function useActivatedGuard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user : User | null = useSelector(getUser);
  // let isAuth = true;
  // let user = useMemo(
  //   () => ({
  //     activated: false,
  //   }),
  //   []
  // );
  const setLoaderTrue = useCallback(()=>dispatch(toggleLoader(true)),[dispatch])
  const setLoaderFalse = useCallback(()=>dispatch(toggleLoader(false)),[dispatch])
  useEffect(() => {

    if(!user){
    setLoaderTrue();

        router.push("/");
    }
    if(user && !user.activated){
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

  }, [user, router,dispatch,setLoaderFalse,setLoaderTrue]);
}
