import { toggleLoader } from "@/Slices/loader";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

export default function useSignIn(
  state: any,
  onSuccess: () => void,
  onError: () => void
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.isLoading) {
      dispatch(toggleLoader(true));
    }
    if (state.isSuccess) {
      dispatch(toggleLoader(false));

      if (onSuccess) {
        onSuccess();
      }
    }
    if (state.isError) {
      dispatch(toggleLoader(false));

      if (onError) {
        onError();
        state.isError = null;
      }
    }
  }, [onSuccess, onError, state, dispatch]);
}
