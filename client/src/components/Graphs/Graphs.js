import React from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import socketIOClient from "socket.io-client";
class Graphs extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    let socket = socketIOClient(process.env.REACT_APP_BACKEND_API_URL);
    /**
     * listens to 'data' event.
     * receive randomly generated data from backend.
     */
    socket.on("data", data => {
      this.setState(prevState => ({
        data: [...prevState.data, data]
      }));
    });
  }

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
