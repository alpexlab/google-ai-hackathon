"use client";
import React, { createContext } from "react";
import { Engine } from "./engine";

export const EngineContext = createContext(new Engine());

export function EngineProvider(props: { children: React.ReactNode }) {
    const [store] = React.useState(new Engine());
    return (
      <EngineContext.Provider value={store}>
        {props.children}
      </EngineContext.Provider>
    );
  }
  