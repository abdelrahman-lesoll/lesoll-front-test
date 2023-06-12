export const initialState = {
  offer: "",
  location: "",
  rooms: "",
  bathRooms: "",
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  sortType: "",
};

export const HomeSearchImgs = ["Search", "Book", "Contract"];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "offer":
      return {
        ...state,
        offer: action.payload,
      };
    case "location":
      return {
        ...state,
        location: action.payload,
      };
    case "rooms":
      return {
        ...state,
        rooms: action.payload,
      };
    case "bathRooms":
      return {
        ...state,
        bathRooms: action.payload,
      };
    case "minPrice":
      return {
        ...state,
        minPrice: action.payload,
      };
    case "maxPrice":
      return {
        ...state,
        maxPrice: action.payload,
      };
    case "minArea":
      return {
        ...state,
        minArea: action.payload,
      };
    case "maxArea":
      return {
        ...state,
        maxArea: action.payload,
      };
    case "sortType":
      return {
        ...state,
        sortType: action.payload,
      };
    case "reset-all":
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};
