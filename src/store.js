import { configureStore } from "@reduxjs/toolkit";
import Governrate from "./Api/Governrate";
import Country from "./Api/Country";
import Realty from "./Api/Realty";
import Auth from "./Api/Auth";
import Appointment from "./Api/Appointment";
import Notification from "./Api/Notification";
import Contact from "./Api/Contact";
import FAQ from "./Api/FAQ";
import Property from "./Api/Property";
import Service from "./Api/Service";
import Terms from "./Api/Terms";
import Blogs from "./Api/Blog";
import Regions from "./Api/Region";
import User from "./Api/User";
import Chat from "./Api/Chat";

const store = configureStore({
  reducer: {
    auth: Auth,
    user: User,
    governrate: Governrate,
    country: Country,
    contact: Contact,
    term: Terms,
    faq: FAQ,
    property: Property,
    service: Service,
    realty: Realty,
    appointment: Appointment,
    blog: Blogs,
    notification: Notification,
    region: Regions,
    chat: Chat,
  },
});

export default store;
