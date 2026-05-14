import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    isLoggedIn: boolean;
    email: string | null;
};

const savedAuth = localStorage.getItem("auth");

const initialState: AuthState = savedAuth
     ? JSON.parse(savedAuth)
     :{
        isLoggedIn : false,
        email: null,
     };

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.email = action.payload;
            
        localStorage.setItem("auth", JSON.stringify(state));    
    },
    
    logout: (state) => {
        state.isLoggedIn = false;
        state.email = null;
    
        localStorage.setItem("auth", JSON.stringify(state));
    },
},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;