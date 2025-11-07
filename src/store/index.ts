import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { praxisApi } from "./slices/praxisApi";
import { statsApi } from "./slices/statsApi";
import { usersApi } from "./slices/usersApi";
import { wordsApi } from "./slices/wordsApi";

export const makeStore = (preloadedState?: unknown) => {
  const store = configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
      [wordsApi.reducerPath]: wordsApi.reducer,
      [statsApi.reducerPath]: statsApi.reducer,
      [praxisApi.reducerPath]: praxisApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(usersApi.middleware)
        .concat(wordsApi.middleware)
        .concat(statsApi.middleware)
        .concat(praxisApi.middleware),
    preloadedState,
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
