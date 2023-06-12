import { useContext } from "react";
import { ShowContext } from "../../App";
import { useLogin } from "../Hooks/useAuth";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

const Models = () => {
  const Context = useContext(ShowContext);
  // all here to avoid multi toast errors ..
  const {
    handleLogin,
    GooogleLogin,
    FaceBookLogin,
    handleRegister,
    handleGenerateToken,
    handleUpdate,
  } = useLogin(Context);
  return (
    <>
      <Login {...{ Context, GooogleLogin, FaceBookLogin, handleLogin }} />
      <Register {...{ Context, GooogleLogin, FaceBookLogin, handleRegister }} />
      <Profile {...{ Context, handleUpdate }} />
      <ForgotPassword {...{ Context, handleGenerateToken }} />
    </>
  );
};

export default Models;
