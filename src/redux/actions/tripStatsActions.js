import getPeriod, { getPeriodFromMonth } from '../utils/getPeriod';
import axiosInstance from '../../helpers/http';
import { errorToast } from './../../helpers/generateToast';

export const getTripStats = (option, timeFrame) => {
  return async (dispatch) => {
    dispatch(fetchingStats());
    const period = timeFrame ? timeFrame : getPeriod(option);
    try {
      const response = await axiosInstance.post(
        '/trips/tripstatistics',
        period
      );
      console.log(response?.data.Tripstatistics);
      const responseData = {
        isSuccess: response?.data?.success || response?.success,
        message: response?.data.message || response?.error,
        stats: {
          ...response?.data.Tripstatistics,
        },
      };

      if (!responseData.isSuccess) {
        errorToast(responseData.message);
        return;
      }
      console.log('after', responseData);
      dispatch(setStats({ ...responseData, selected: option, period }));
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };
      errorToast(err.message);
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
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    Promise.all(
      months.map((month) => {
        const period = getPeriodFromMonth(month);
        return axiosInstance.post('/trips/tripstatistics', period);
      })
    )
      .then((data) => {
        const result = JSON.parse(JSON.stringify(data));
        console.log('11111', data);

        const response = {
          isSuccess: true,
          chartStats: result.map((item) => {
            return item?.data.Tripstatistics || item.Tripstatistics;
          }),
        };
        console.log('aaaaa', response);
        dispatch(setChartStats(response));
      })
      .catch((err) => {
        const response = {
          isSuccess: false,
          chartStats: [],
        };
        errorToast(err.message);
        dispatch(setChartStats({ ...response }));
      });
  };
};

// REDUCERS
const setStats = (state) => {
  return {
    type: 'SET_STATS',
    payload: {
      ...state,
    },
  };
};

const setChartStats = (state) => {
  return {
    type: 'SET_CHART_STATS',
    payload: {
      ...state,
    },
  };
};

const setOption = (option) => {
  return {
    type: 'SET_SELECTED',
    payload: { selected: option },
  };
};

const setPeriod = (period) => {
  return {
    type: 'SET_PERIOD',
    payload: { period: period },
  };
};

const fetchingStats = () => {
  return {
    type: 'FETCH_STATS',
  };
};

const fetchingChartStats = () => {
  return {
    type: 'FETCH_CHART_STATS',
  };
};
