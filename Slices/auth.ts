import { User } from '@/Interfaces/User';
import api from '@/apis/axiosApi';
import { backendUrl } from '@/utils/backendUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState: {
    user : User | null
} = {
    user : null
} ;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser : (state :any | null,{payload}: {payload : User | null}) => {
        

      if(!isEqual(state.user , payload)){
        
        state.user = payload;
      }
         
       }
  },
});

export const refreshTokens = createAsyncThunk<any, void>(
  'auth/refreshTokens',
  async (_, {dispatch}) => {
    const response = await api.get('/refresh-tokens');
    dispatch(setUser(response.data.data.user))
// setTimeout(()=>dispatch(setUser(response.data.data.user)) , 1000)

  }
);

export const isEqual = (...objects :Array<any>) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));
export const { setUser } = authSlice.actions;
export const getUser = (state:any)=>state.auth.user;
export default authSlice.reducer;