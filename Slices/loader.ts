import { createSlice } from '@reduxjs/toolkit'

const initialState: Boolean = false

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader : (state,{payload}) => {
     return state = payload;
    }
  },
})


export const { toggleLoader } = loaderSlice.actions
export const getLoaderState = (state:any)=>state.loader;
export default loaderSlice.reducer;