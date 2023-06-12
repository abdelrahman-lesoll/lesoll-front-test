import React from "react";
import JwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const AuthContext = React.createContext();
const userKey = parseInt(
  Math.ceil(Math.random() * Date.now())
    .toPrecision(16)
    .toString()
    .replace(".", "")
);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("userInfo");

  const navigate = useNavigate();
  const [socket, setSocket] = React.useState(null);
  const [user, setUser] = React.useState(
    token ? JwtDecode(token).newUser : null
  );

  // for new Version && identify unauthenticated user
  React.useEffect(() => {
    if (JSON.stringify(token).split("userData").length > 1) {
      logout();
    }
    if (!localStorage.getItem("user-key")) {
      localStorage.setItem("user-key", userKey);
    }
    setSocket(io(import.meta.env.VITE_SOCKET_PORT));
  }, []);

  React.useEffect(() => {
    user && socket?.emit("signedIn", user);
  }, [socket, user]);

  const logout = () => {
    localStorage.removeItem("userInfo");
    socket?.emit("signedOut");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, socket, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
