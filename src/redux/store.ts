import { configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import cityReducer from "./citySlice";
import journalReducer from "./entriesSlice";
import selectedEntryReducer from "./selectedEntrySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        city: cityReducer,
        journal: journalReducer,
        selectedEntry: selectedEntryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;