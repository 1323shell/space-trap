const reducer = (state, action) => {
  switch (action.type) {
    case 'start': {
      return { ...state, start: true, end: false };
    }
    case 'end': {
      return { ...state, end: true, score: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
