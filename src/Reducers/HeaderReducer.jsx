export const initialState = {
  modalLogin: false,
  modalRegister: false,
  modalForgot: false,
  modalUpdate: false,
  modalImg: false,
  modalOffcanvas: false,
  modalShare: false,
  modalAdminOffcanvas: false,
  modalChat: false,
  modalSearch: false,
  modalMapRouting: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "modalLogin":
      return {
        ...state,
        modalLogin: !state.modalLogin,
      };
    case "modalRegister":
      return {
        ...initialState,
        modalRegister: !state.modalRegister,
      };
    case "modalForgot":
      return {
        ...initialState,
        modalForgot: !state.modalForgot,
      };
    case "modalUpdate":
      return {
        ...state,
        modalUpdate: !state.modalUpdate,
      };
    case "modalImg":
      return {
        ...state,
        modalImg: true,
      };
    case "modalOffcanvas":
      return {
        ...state,
        modalOffcanvas: !state.modalOffcanvas,
      };
    case "modalShare":
      return {
        ...state,
        modalShare: !state.modalShare,
      };
    case "modalAdminOffcanvas":
      return {
        ...state,
        modalAdminOffcanvas: !state.modalAdminOffcanvas,
      };
    case "modalChat":
      return {
        ...state,
        modalChat: !state.modalChat,
      };
    case "modalSearch":
      return {
        ...state,
        modalSearch: !state.modalSearch,
      };
    case "modalMapRouting":
      return {
        ...state,
        modalMapRouting: !state.modalMapRouting,
      };
    case "closeAllModals":
      return { ...initialState };
  }
};
