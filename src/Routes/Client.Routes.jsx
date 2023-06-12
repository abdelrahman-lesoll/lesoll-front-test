import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { FullLoading } from "../Components/Shared/Loading";
import { RequireAuth } from "../Utils/RequireAuth";
import { useAuth } from "../Utils/Auth";
import Footer from "../Components/Client/Footer/Footer";
import ErrorPage from "../Components/Shared/ErrorPage";
import Header from "../Components/Client/Header/Header";
import Modals from "../Components/Modals/Modals";
// import ChatIcon from "../Components/Client/Chat/ChatIcon";

const Detail = lazy(() => import("../Components/Client/Spec/Detail"));
const Home = lazy(() => import("../Components/Client/Home/Home"));
const Search = lazy(() => import("../Components/Client/Search/Search"));
const ResetPassword = lazy(() => import("../Components/Modals/ResetPassword"));
const Sitemap = lazy(() => import("../Components/Client/Site/Sitemap"));
const Terms = lazy(() => import("../Components/Client/About/Terms"));
const Blogs = lazy(() => import("../Components/Client/Blogs/Blogs"));
const SingleBlog = lazy(() => import("../Components/Client/Blogs/SingleBlog"));
const Privacy = lazy(() => import("../Components/Client/About/Privacy"));
const Compare = lazy(() => import("../Components/Client/Compared/Compared"));
const Q_A = lazy(() => import("../Components/Client/Q_A/Q_A"));
const About = lazy(() => import("../Components/Client/About/About"));
const Contact = lazy(() => import("../Components/Client/Contact/Contact"));
const BookMarks = lazy(() => import("../Components/Client/Profile/BookMarks"));
const Main = lazy(() => import("../Components/Client/Profile/Main"));
const MyProperty = lazy(() =>
  import("../Components/Client/Profile/MyProperty")
);
const SubmitProperty = lazy(() =>
  import("../Components/Client/Realty/SubmitProperty")
);
const MostViewRealties = lazy(() =>
  import("../Components/Client/Realty/MostViewRealties")
);
const RealtiesByGovernrate = lazy(() =>
  import("../Components/Client/Governrate/RealtiesByGovernrate")
);
const RelatedRealties = lazy(() =>
  import("../Components/Client/Realty/RelatedRealties")
);
const RealtiesByRegion = lazy(() =>
  import("../Components/Client/Governrate/RealtiesByRegion")
);
const UserRealties = lazy(() =>
  import("../Components/Client/Profile/UserRealties")
);
const AllGovernrates = lazy(() =>
  import("../Components/Client/Governrate/AllGovernrates")
);
const UpdateProperty = lazy(() =>
  import("../Components/Client/Realty/UpdateProperty")
);
const Notifications = lazy(() =>
  import("../Components/Client/Profile/Notifications")
);
const ChangePassword = lazy(() =>
  import("../Components/Client/Profile/ChangePassword")
);
const Appointments = lazy(() =>
  import("../Components/Client/Appointments/Appointments")
);

const ClientRoutes = () => {
  const auth = useAuth();
  return (
    <>
      <Header />
      <ErrorPage />
      {/* <Suspense fallback={<FullLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Detail/:type/:offer/:governrate/:id"
            element={<Detail auth={auth} />}
          />
          <Route path="/Detail/:id" element={<Detail auth={auth} />} />
          <Route path="/Reset-Password" element={<ResetPassword />} />
          <Route
            path="/Related/:unitType/:governrate/:region/:id"
            element={<RelatedRealties />}
          />
          <Route path="/Search" element={<Search />} />
          <Route path="/MostView" element={<MostViewRealties />} />
          <Route path="/Sitemap/*" element={<Sitemap />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Blogs/:title" element={<SingleBlog />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/About" element={<About />} />
          <Route path="/Q_A" element={<Q_A />} />
          <Route path="/Governrates" element={<AllGovernrates />} />
          <Route path="/User/:id" element={<UserRealties />} />
          <Route path="/Governrate/:id" element={<RealtiesByGovernrate />} />
          <Route path="/Region/:title" element={<RealtiesByRegion />} />
          <Route path="/Submit-Property" element={<SubmitProperty />} />
          <Route
            path="Compare-Property"
            element={
              <RequireAuth>
                <Compare />
              </RequireAuth>
            }
          />
          <Route
            path="Update-Property/:id"
            element={
              <RequireAuth>
                <UpdateProperty auth={auth} />
              </RequireAuth>
            }
          />
          <Route
            path="/User"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          >
            <Route
              index
              element={
                <RequireAuth>
                  <MyProperty />
                </RequireAuth>
              }
            />
            <Route
              path="My-Property"
              element={
                <RequireAuth>
                  <MyProperty />
                </RequireAuth>
              }
            />
            <Route
              path="Bookmarks"
              element={
                <RequireAuth>
                  <BookMarks />
                </RequireAuth>
              }
            />
            <Route
              path="Appointments"
              element={
                <RequireAuth>
                  <Appointments auth={auth} />
                </RequireAuth>
              }
            />
            <Route
              path="Notifications"
              element={
                <RequireAuth>
                  <Notifications />
                </RequireAuth>
              }
            />
            <Route
              path="Password"
              element={
                <RequireAuth>
                  <ChangePassword auth={auth} />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense> */}
      <Footer />
      <Modals />
      {/* {auth.user && auth.user.role !== "Admin" && <ChatIcon />} */}
    </>
  );
};

export default ClientRoutes;
