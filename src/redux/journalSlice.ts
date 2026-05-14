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

type JournalState = {
  entries: JournalEntry[];
};

const savedEntries = localStorage.getItem("journal");

const initialState: JournalState = {
  entries: savedEntries 
  ? JSON.parse(savedEntries) 
  : [],
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addEntry: ( 
      state, 
      action: PayloadAction<JournalEntry>
    ) => {
      console.log("Adding entry:", action.payload); 
      state.entries.push(action.payload);

      localStorage.setItem(
        "journal",
        JSON.stringify(state.entries)
      )
    },
    updateEntry: (
      state,
      action: PayloadAction<JournalEntry>
    ) => {
      const updatedEntry = action.payload;

      const index = state.entries.findIndex(

        (entry) =>
          entry.id === updatedEntry.id
      );
      if (index !== -1) {
        state.entries[index] = updatedEntry;

       localStorage.setItem(
          "journal",
          JSON.stringify(state.entries)
        );
      }
    },
  },
});

export const {
  addEntry,
  updateEntry,
} = journalSlice.actions;

export default journalSlice.reducer; 