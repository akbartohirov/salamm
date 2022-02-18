import { createContext } from "react";

const empty = function () {};

const AuthContext = createContext({
  token: null,
  userId: null,
  login: empty,
  logout: empty,
  isAuthenticated: false,
});

export default AuthContext;
