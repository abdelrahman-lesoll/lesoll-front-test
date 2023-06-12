import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { FullLoading } from "../Components/Shared/Loading";
import { useAuth } from "../Utils/Auth";
import Header from "../Components/Admin/Header/Header";

// const UpdateTerm = lazy(() => import("../Components/Admin/Terms/UpdateTerm"));
// const AddTerm = lazy(() => import("../Components/Admin/Terms/AddTerm"));
const Terms = lazy(() => import("../Components/Admin/Terms/Terms"));
const Chat = lazy(() => import("../Components/Admin/Chat/Chat"));
const Dashboard = lazy(() => import("../Components/Admin/Dashboard/Dashboard"));
const AllUsers = lazy(() => import("../Components/Admin/Client/AllUsers"));
const Regions = lazy(() => import("../Components/Admin/Regions/Regions"));
const Services = lazy(() => import("../Components/Admin/Services/Services"));
const Contacts = lazy(() => import("../Components/Admin/Contact/Contacts"));
const ReviewContact = lazy(() =>
  import("../Components/Admin/Contact/ReviewContact")
);
const Governrates = lazy(() =>
  import("../Components/Admin/Governrate/AllGovernrates")
);
const UpdateGovernrate = lazy(() =>
  import("../Components/Admin/Governrate/UpdateGovernrate")
);
const AddCountry = lazy(() => import("../Components/Admin/Country/AddCountry"));
const AllCountries = lazy(() =>
  import("../Components/Admin/Country/AllCountries")
);
const Realties = lazy(() => import("../Components/Admin/Realty/Realties"));
// const UserRealty = lazy(() => import("../Components/Admin/Realty/UserRealty"));
const ErrorPage = lazy(() => import("../Components/Shared/ErrorPage"));
const AllFAQ = lazy(() => import("../Components/Admin/Q_A/AllFAQ"));
const AddFAQ = lazy(() => import("../Components/Admin/Q_A/AddFAQ"));
const UpdateFAQ = lazy(() => import("../Components/Admin/Q_A/UpdateFAQ"));
// const AllProperties = lazy(() =>
//   import("../Components/Admin/Property/AllProperties")
// );
// const AddProperty = lazy(() =>
//   import("../Components/Admin/Property/AddProperty")
// );
// const UpdateProperty = lazy(() =>
//   import("../Components/Admin/Property/UpdateProperty")
// );
// const PropertyHeaders = lazy(() =>
//   import("../Components/Admin/Property/Header/PropertyHeaders")
// );
// const AddPropertyHeader = lazy(() =>
//   import("../Components/Admin/Property/Header/AddPropertyHeader")
// );
// const UpdatePropertyHeader = lazy(() =>
//   import("../Components/Admin/Property/Header/UpdatePropertyHeader")
// );
// const ClientDetail = lazy(() =>
//   import("../Components/Admin/Client/ClientDetail")
// );
const RealtyStatus = lazy(() =>
  import("../Components/Admin/Realty/RealtyStatus")
);
const EditRealty = lazy(() =>
  import("../Components/Admin/Realty/Update/EditRealty")
);
const UpdateRegion = lazy(() =>
  import("../Components/Admin/Regions/UpdateRegion")
);
const Appointments = lazy(() =>
  import("../Components/Admin/Appointments/Appointments")
);
const AddService = lazy(() =>
  import("../Components/Admin/Services/AddService")
);
const UpdateService = lazy(() =>
  import("../Components/Admin/Services/UpdateService")
);
const Notification = lazy(() =>
  import("../Components/Admin/Notification/Notification")
);
const AddBlog = lazy(() => import("../Components/Admin/Blogs/AddBlog"));
const UpdateBlog = lazy(() => import("../Components/Admin/Blogs/UpdateBlog"));
const AllBlogs = lazy(() => import("../Components/Admin/Blogs/AllBlogs"));

const AdminRoutes = () => {
  const auth = useAuth();
  return (
    <div className="container-fluid">
      <Header auth={auth} />
      <Suspense fallback={<FullLoading />}>
        <Routes>
          <Route path="/Admin" element={<Dashboard />} />
          <Route path="/Admin/Contacts" element={<Contacts />} />
          <Route path="/Admin/Contacts/:id" element={<ReviewContact />} />
          <Route path="/Admin/All-Users" element={<AllUsers />} />
          <Route path="/Admin/Regions" element={<Regions />} />
          <Route path="/Admin/Update-Region/:id" element={<UpdateRegion />} />
          <Route path="/Admin/Blogs" element={<AllBlogs />} />
          <Route path="/Admin/Add-Blog" element={<AddBlog />} />
          <Route path="/Admin/Update-Blog/:id" element={<UpdateBlog />} />
          <Route path="/Admin/Services" element={<Services />} />
          <Route path="/Admin/Realties" element={<Realties />} />
          <Route path="/Admin/Realties/Detail/:id" element={<EditRealty />} />
          <Route path="/Admin/Appointments" element={<Appointments />} />
          <Route path="/Admin/FAQS" element={<AllFAQ />} />
          <Route path="/Admin/Terms" element={<Terms />} />
          <Route path="/Admin/Governrates" element={<Governrates />} />
          <Route
            path="/Admin/Update-Governrate/:id"
            element={<UpdateGovernrate />}
          />
          <Route path="/Admin/Add-Country" element={<AddCountry />} />
          <Route path="/Admin/All-Countries" element={<AllCountries />} />
          <Route path="/Admin/Notifications" element={<Notification />} />
          <Route
            path="/Admin/Realties/Status/:status"
            element={<RealtyStatus />}
          />
          <Route path="/Admin/Add-Service" element={<AddService />} />
          <Route path="/Admin/Update-Service/:id" element={<UpdateService />} />
          <Route path="/Admin/Add-FAQ" element={<AddFAQ />} />
          <Route path="/Admin/Update-FAQ/:id" element={<UpdateFAQ />} />
          <Route path="/Admin/Chats" element={<Chat />} />
          {/* 
          <Route path="/Admin/User-Detail/:id" element={<ClientDetail />} />
          <Route path="/Admin/Add-Term" element={<AddTerm />} />
          <Route path="/Admin/Update-Term/:id" element={<UpdateTerm />} />
          <Route path="/Admin/Add-Governrate" element={<AddGovernrate />} />
          <Route
            path="/Admin/Update-Governrate/:id"
            element={<UpdateGovernrate />}
          />
          <Route path="/Admin/Property-Headers" element={<PropertyHeaders />} />
          <Route path="/Admin/Properties" element={<AllProperties />} />
          <Route path="/Admin/Add-Property" element={<AddProperty />} />
          <Route
            path="/Admin/Update-Property/:id"
            element={<UpdateProperty />}
          />
          <Route
            path="/Admin/Add-Property-Header"
            element={<AddPropertyHeader />}
          />
          <Route
            path="/Admin/Update-Property-Header/:id"
            element={<UpdatePropertyHeader />}
          />
          <Route path="/Admin/Realties/User/:user" element={<UserRealty />} />*/}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AdminRoutes;
