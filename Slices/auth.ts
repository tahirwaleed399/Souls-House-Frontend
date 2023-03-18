import { User } from '@/Interfaces/User';
import { createSlice } from '@reduxjs/toolkit'

const initialState: {
    user : User | null
} = {
    user : null
} ;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser : (state :any | null,{payload}: {payload : User}) => {
        

      if(!isEqual(state.user , payload)){
        
        state.user = payload;
      }
         
       }
  },
});

export const isEqual = (...objects :Array<any>) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));
export const { setUser } = authSlice.actions;
export const getUser = (state:any)=>state.auth.user;
export default authSlice.reducer;