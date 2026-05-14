import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SelectedEntryState = {
  lat: number;
  lng: number;
};

const initialState: SelectedEntryState = {
  lat: 20,
  lng: 0,
};

const selectedEntrySlice = createSlice({
  name: "selectedEntry",

  initialState,

  reducers: {

    setSelectedEntry: (
      state,
      action: PayloadAction<SelectedEntryState>
    ) => {

      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setSelectedEntry } =
  selectedEntrySlice.actions;

export default selectedEntrySlice.reducer;