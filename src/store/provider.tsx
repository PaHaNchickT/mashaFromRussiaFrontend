"use client";

import type { ReactNode } from "react";
import React, { useState } from "react";
import { Provider } from "react-redux";

import type { RootState } from "./index";
import { makeStore } from "./index";

export default function ReduxProvider({
  children,
}: {
  children: ReactNode;
  preloadedState?: RootState;
}) {
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
