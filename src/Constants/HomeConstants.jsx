import { FaFileContract, FaRegCalendarAlt } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FormattedMessage } from "react-intl";

export const Owner = [
  {
    icon: (
      <img
        src="/Img/Extra/Add-Realty.jpg"
        className="mw-100"
        height="64"
        width="64"
      />
    ),
    title: "AddProperty",
    description: "AddPropInfo",
  },
  {
    icon: <IoInformationCircleOutline size="4rem" className="main-text" />,
    title: "AddInfo",
    description: "AddDetail",
  },
  {
    icon: <FaRegCalendarAlt size="4rem" className="main-text" />,
    title: "AddAppointment",
    description: "AddAppointmentInfo",
  },
];

export const Buyer = [
  {
    icon: <GoSearch size="4rem" className="main-text" />,
    title: "SelectProperty",
    description: "SelectPropertyInfo",
  },
  {
    icon: <FaRegCalendarAlt size="4rem" className="main-text" />,
    title: "BookAppointment",
    description: "BookAppointmentDetail",
  },
  {
    icon: <FaFileContract size="4rem" className="main-text" />,
    title: "CloseDeal",
    description: "CloseDealInfo",
  },
];

export const HomeSearchOptions = [
  {
    type: "rooms",
    id: "Rooms",
  },
  {
    type: "bathRooms",
    id: "BathRooms",
  },
  {
    type: "minPrice",
    id: "MinPrice",
  },
  {
    type: "maxPrice",
    id: "MaxPrice",
  },
  {
    type: "minArea",
    id: "MinArea",
  },
  {
    type: "maxArea",
    id: "MaxArea",
  },
];

export const HomeCheck = ["All", "For Rent", "For Sale"];

export const defaultSearchValue = (searchParams) => {
  return [
    {
      label: <FormattedMessage id={searchParams.get("offer") || "All"} />,
      value: searchParams.get("offer"),
    },
  ];
};

export const defaultSaleOption = (searchParams) => {
  return [
    {
      label: <FormattedMessage id={searchParams.get("saleOption") || "Cash"} />,
      value: searchParams.get("saleOption"),
    },
  ];
};

export const defaultExtra = (searchParams) => {
  return [
    {
      label: <FormattedMessage id={searchParams.get("sortType") || "Newest"} />,
      value: searchParams.get("sortType"),
    },
  ];
};
