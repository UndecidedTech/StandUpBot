import React, { createContext, useReducer } from "react";

export const Action = {
  UPDATE: "UPDATE",
  RESET: "RESET",
};

const initialState = {
  username: undefined,
  image: undefined,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case Action.UPDATE:
      return { ...state, ...payload };
    case Action.RESET:
      return { username: null, image: null, userId: null };
    default:
      return state;
  }
};

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
