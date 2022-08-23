import { authHeader } from "../utils/dataSession";
import getPeriod, { getPeriodFromMonth } from "../utils/getPeriod";

export const getTripStats = (option, timeFrame) => {
  return async (dispatch) => {
    dispatch(fetchingStats());
    const period = timeFrame ? timeFrame : getPeriod(option);
    const token = authHeader();
    const url =
      "https://winners-c8-bn-be-staging.herokuapp.com/api/trips/tripstatistics";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.Authorization,
        },
        body: JSON.stringify(period),
      });
      const resultData = await response.json();
      const responseData = {
        isSuccess: resultData.success,
        message: resultData.message,
        stats: { ...resultData.Tripstatistics },
      };
      dispatch(setStats({ ...responseData, selected: option, period }));
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };
      dispatch(setStats({ ...responseData, selected: option, period }));
    }
  };
};

export const changeOption = (option) => {
  return async (dispatch) => {
    dispatch(setOption(option));
  };
};

export const changePeriod = (period) => {
  return async (dispatch) => {
    return dispatch(setPeriod({ ...period }));
  };
};

export const getChartStats = () => {
  return async (dispatch) => {
    dispatch(fetchingChartStats());
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const token = authHeader();
    const url =
      "https://winners-c8-bn-be-staging.herokuapp.com/api/trips/tripstatistics";

    Promise.all(
      months.map((month) => {
        const period = getPeriodFromMonth(month);
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.Authorization,
          },
          body: JSON.stringify(period),
        }).then((res) => res.json());
      })
    )
      .then((data) => {
        const result = JSON.parse(JSON.stringify(data));
        const response = {
          isSuccess: true,
          chartStats: result.map((item) => {
            return item.Tripstatistics;
          }),
        };

        dispatch(setChartStats(response));
      })
      .catch((err) => {
        const response = {
          isSuccess: false,
          chartStats: [],
        };
        dispatch(setChartStats({ ...response }));
      });
  };
};

// REDUCERS
const setStats = (state) => {
  return {
    type: "SET_STATS",
    payload: {
      ...state,
    },
  };
};

const setChartStats = (state) => {
  return {
    type: "SET_CHART_STATS",
    payload: {
      ...state,
    },
  };
};

const setOption = (option) => {
  return {
    type: "SET_SELECTED",
    payload: { selected: option },
  };
};

const setPeriod = (period) => {
  return {
    type: "SET_PERIOD",
    payload: { period: period },
  };
};

const fetchingStats = () => {
  return {
    type: "FETCH_STATS",
  };
};

const fetchingChartStats = () => {
  return {
    type: "FETCH_CHART_STATS",
  };
};
