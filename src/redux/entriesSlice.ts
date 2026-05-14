import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type JournalEntry = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  note: string;
  date: string;
};

type EntriesState = {
  entries: JournalEntry[];
};

const savedEntries = localStorage.getItem("entries");

const initialState: EntriesState = {
  entries: savedEntries ? JSON.parse(savedEntries) : [],
};

const EntriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry: ( 
      state, 
      action: PayloadAction<JournalEntry>
    ) => {
      console.log("Adding entry:", action.payload); 
      state.entries.push(action.payload);

      localStorage.setItem(
        "entries",
        JSON.stringify(state.entries)
      )
    },
    deleteEntry: (
      state,
      action: PayloadAction<string>
    ) => {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
      localStorage.setItem(
        "entries",
        JSON.stringify(state.entries)
      );
    },
    },
  },
);

export const {
  addEntry,
  deleteEntry
} = EntriesSlice.actions;

export default EntriesSlice.reducer; 