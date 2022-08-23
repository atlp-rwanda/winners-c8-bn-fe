import getPeriod from "../utils/getPeriod";

const initialState = {
  stats: {},
  period: getPeriod("month"),
  selected: "month",
  isLoading: false,
  isLoaded: false,
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STATS":
      return {
        ...state,
        stats: action.payload.stats,
        selected: action.payload.selected,
        period: action.payload.period,
        isLoading: false,
        isLoaded: action.payload.isSuccess,
      };

    case "FETCH_STATS":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_SELECTED":
      return {
        ...state,
        selected: action.payload.selected,
      };

    case "SET_PERIOD":
      return {
        ...state,
        period: { ...action.payload.period },
      };
    default:
      return state;
  }
};

const chartInitialState = {
  chartStats: [],
  isLoading: false,
  isLoaded: false,
};

export const chartStatsReducer = (state = chartInitialState, action) => {
  switch (action.type) {
    case "FETCH_CHART_STATS":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_CHART_STATS":
      return {
        chartStats: action.payload.chartStats,
        isLoading: false,
        isLoaded: action.payload.isSuccess,
      };

    default:
      return state;
  }
};
