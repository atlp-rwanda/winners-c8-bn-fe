import React from "react";

function StatsCard(props) {
  return (
    <div className="stats-card">
      <header className="card-header">{props.data.title}</header>
      <div className="card-content">{props.data.content}</div>
    </div>
  );
}

export default StatsCard;
