export const initialState = {
  isService: false,
  isRealty: false,
  isFAQ: false,
  isTerm: false,
  isProperty: false,
  isBlog: false,
  isCountry: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "service":
      return {
        ...state,
        isService: !state.isService,
      };
    case "realty":
      return {
        ...state,
        isRealty: !state.isRealty,
      };
    case "faq":
      return {
        ...state,
        isFAQ: !state.isFAQ,
      };
    case "term":
      return {
        ...state,
        isTerm: !state.isTerm,
      };
    case "property":
      return {
        ...state,
        isProperty: !state.isProperty,
      };
    case "blog":
      return {
        ...state,
        isBlog: !state.isBlog,
      };
    case "country":
      return {
        ...state,
        isCountry: !state.isCountry,
      };
  }
};
