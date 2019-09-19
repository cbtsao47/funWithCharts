import React from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";

class Graphs extends React.Component {
  render() {
    return (
      <>
        <LineChart />
        <BarChart />
      </>
    );
  }
}
export default Graphs;
