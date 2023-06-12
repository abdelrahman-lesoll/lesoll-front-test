import { useDispatch, useSelector } from "react-redux";
import {
  facebookLogin,
  generateTempToken,
  googleLogin,
  resetPassword,
  resetError,
} from "../../Api/Auth";
import { login, register, updateUser } from "../../Api/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Utils/Auth";
import { gapi } from "gapi-script";
import jwtDecode from "jwt-decode";

export const useLogin = (Context) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogin = (values) => dispatch(login(values));
  const handleRegister = (values) => dispatch(register(values));
  const GooogleLogin = (values) => dispatch(googleLogin(values));
  const FaceBookLogin = (values) => dispatch(facebookLogin(values));
  const handleUpdate = (values) => dispatch(updateUser(values));
  const handleGenerateToken = (values) => dispatch(generateTempToken(values));
  const handleResetPassword = (values) => dispatch(resetPassword(values));

  useEffect(() => {
    if (!state.loading) {
      if (state.token) {
        const { newUser } = jwtDecode(state.token);
        if (localStorage.getItem("userInfo")) {
          auth.setUser(newUser);
        }
        // Came From Reset-Password
        if (Context === "Reset-Password") {
          navigate("/");
        } else {
          Context?.dispatch({ type: "closeAllModals" });
        }
      } else if (state.error) {
        if (state.updateError) {
          Context.dispatch({ type: "closeAllModals" });
          navigate("/Error-Invalid", { state: { statusCode: 500 } });
          dispatch(resetError());
        } else {
          toast.error(state.error);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_CLIENT_ID,
        scope: "email",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  return {
    handleLogin,
    GooogleLogin,
    FaceBookLogin,
    handleRegister,
    handleUpdate,
    handleGenerateToken,
    handleResetPassword,
  };
};
