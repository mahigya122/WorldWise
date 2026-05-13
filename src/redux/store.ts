import { configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import cityReducer from "./citySlice";
import journalReducer from "./journalSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        city: cityReducer,
        journal: journalReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;