import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  loader : Boolean
} = {
  loader : false 
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader : (state,{payload}) => {
      state.loader = payload;
    }
  },
})


export const { toggleLoader } = loaderSlice.actions
export const getLoaderState = (state:any)=>state.loader.loader;
export default loaderSlice.reducer;