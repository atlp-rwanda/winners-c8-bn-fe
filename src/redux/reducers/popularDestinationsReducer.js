const initialValues = {
  data: [],
  isSuccess: false,
};

const PopularDestinationsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "SET_POPULAR_DESTINATIONS":
      return { ...action.payload };

    default:
      return state;
  }
};

export default PopularDestinationsReducer;
