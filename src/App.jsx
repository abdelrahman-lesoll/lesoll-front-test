import { createContext, useEffect, useReducer } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { reducer, initialState } from "./Reducers/HeaderReducer";
import { RequireAdminAuth } from "./Utils/RequireAuth";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Utils/Auth";
import AdminRoutes from "./Routes/Admin.Routes";
import ClientRoutes from "./Routes/Client.Routes";
import ErrorPage from "./Components/Shared/ErrorPage";

export const ShowContext = createContext();

function App() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (!location.pathname.includes("/Sitemap")) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <>
      <AuthProvider>
        <ShowContext.Provider
          value={{ state, dispatch, searchParams, setSearchParams }}
        >
          {location.pathname.startsWith("/Admin") ? (
            <RequireAdminAuth>
              <AdminRoutes />
            </RequireAdminAuth>
          ) : (
            <ClientRoutes />
          )}

          <ToastContainer />
        </ShowContext.Provider>
      </AuthProvider>
    </>
  );
}

export default App;
