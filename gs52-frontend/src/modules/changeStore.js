const initialState = {
  sidebarShow: "responsive",
};

const changeStore = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

// const store = createStore(changeState)
export default changeStore;
