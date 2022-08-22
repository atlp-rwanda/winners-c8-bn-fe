import React from "react";
import { connect } from "react-redux";
import * as statsAction from "../../redux/actions/tripStatsActions";

function TimeFrame(props) {
  const options = ["month", "day", "week"];
  const { selectedOption, period, changeOption, getTripStats } = props;
  return (
    <div className="timeframe">
      <div className="dropdown-timeframe">
        <label htmlFor="timeframe-options">Choose Period</label>
        <select
          className="options"
          id="timeframe-options"
          onChange={(e) => {
            if (e.target.value === "other") return changeOption(e.target.value);
            return getTripStats(e.target.value);
          }}
          value={selectedOption}
          data-testid="timeframe-selection"
        >
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                This {option}
              </option>
            );
          })}

          <option value="other">Other</option>
        </select>
      </div>

      <form
        className={
          props.selectedOption === "other"
            ? "form-timeframe active"
            : "form-timeframe"
        }
        data-testid="timeframe-form"
      >
        <div className="input-group">
          <label htmlFor="from">From:</label>
          <input
            type="date"
            name="from"
            id="from"
            className="input-date"
            defaultValue={period.from}
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="to">To:</label>
          <input
            type="date"
            name="to"
            id="to"
            className="input-date"
            defaultValue={period.to}
          ></input>
        </div>
        <button
          type="button"
          className="button btn-timeframe"
          id="submit-btn"
          onClick={() =>
            getTripStats("other", {
              from: period.from,
              to: period.to,
            })
          }
        >
          Show
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tripStats: state.tripStats.stats,
    selectedOption: state.tripStats.selected,
    period: state.tripStats.period,
    isLoaded: state.tripStats.isLoaded,
    isLoading: state.tripStats.isLoading,
  };
};

const { getTripStats, changeOption, changePeriod } = statsAction;

export default connect(mapStateToProps, {
  getTripStats,
  changeOption,
  changePeriod,
})(TimeFrame);
