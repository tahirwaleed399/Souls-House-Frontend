import { useCallback, useEffect, useRef, useState } from "react";

export function useStateWithCallback<STATETYPE>(initialState: STATETYPE):[state : STATETYPE , updateState:any] {
  const [state, setState] = useState<STATETYPE>(initialState);
  const callback = useRef<any>(null);
  const updateState = useCallback(function (newState: any, cb: any) {
    callback.current = cb;
    setState((prev: STATETYPE) => {
      return typeof newState === "function" ? newState(prev) : newState;
    });
  },[]);
  useEffect(() => {
    if (callback.current) {
     
      callback.current();
      callback.current = null;
    }
  }, [state]);
  return [state  , updateState];
}
