import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
export const useLoader = (
  state: any,
  { loading, success }: { loading: string; success: string },
  successCallBack?: ()=>void,
  errorCallback?: ()=>void,
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    toast.dismiss();
    if (state.isLoading) {
      toast.loading(loading);
    }
    if (state.isError) {
      if (errorCallback) {
        errorCallback();
      }
      if (state.error.data) {
        toast.error(state.error.data.data.message as any);
      } else {
        toast.error(`${state.error.status} : ${state.error.error}` as any);
      }
    }
    if (state.isSuccess) {
      toast.success(success);
      if (successCallBack) {
        successCallBack();
      }
     
    }
  }, [state, dispatch, loading, success , successCallBack , errorCallback]);
};
