import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CityState = {
  city: string;
  country: string;
  lat: number;
  lng: number;
};

const initialState: CityState = {
  city: "",
  country: "",
  lat: 0,
  lng: 0,
};

const citySlice = createSlice({
    name : "city",
    initialState,
    reducers: {
        setCity : ( state, action: PayloadAction<CityState>) => {
            state.city = action.payload.city;
            state.country = action.payload.country;
            state.lat = action.payload.lat;
            state.lng = action.payload.lng; 
        },
    },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
