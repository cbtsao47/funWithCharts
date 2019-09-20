import React from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import socketIOClient from "socket.io-client";
import "./Graphs.css";
class Graphs extends React.Component {
  state = {
    data: [],
    thresholdInput: 0,
    overThreshold: false
  };
  componentDidMount() {
    let socket = socketIOClient(process.env.REACT_APP_BACKEND_API_URL);
    /**
     * Listens to 'data' event.
     * receive randomly generated data from backend.
     */
    socket.on("data", data => {
      console.log(data);
      if (data.value >= this.state.thresholdInput) {
        alert("🥂");
      }
      this.setState(prevState => ({
        data: [...prevState.data, data]
      }));
    });
  }
  /**
   * Get timestamps and values from data
   * @param array, `array of objects` containing timestamps and values
   * @returns object,
   */
  getTimeStampsAndValues = data => {
    let timeStamps = [];
    let values = [];
    for (let entry in data) {
      timeStamps.push(data[entry].timestamp);
      values.push(data[entry].value);
    }
    return { timeStamps, values };
  };
  /**
   * Get `values` from data and returns an object containing the ranges and number of times the values appears in ranges ( from -100 to 100 )
   * @param array, `array of objects` containg values
   *
   * @returns object of 2 arrays ranges and count
   */
  getAmountOfNumbers = data => {
    let ranges = [
      "-100 - -91",
      " -90 - -81",
      "-80 - -71",
      "-70 - -61",
      "-60 - -51",
      "-50 - -41",
      "-40 - -31",
      "-30 - -21",
      "-20 - -11",
      "-10 - -1",
      "0 - 10",
      "11 - 20",
      "21 - 30",
      "31 - 40",
      "41 - 50",
      "51 - 60",
      "61 - 70",
      "71 - 80",
      "81 - 90",
      "91 - 100"
    ];
    let count = Array(20).fill(0);
    for (let entry in data) {
      switch (true) {
        case data[entry].value < -90:
          count[0]++;
          break;
        case data[entry].value < -80:
          count[1]++;
          break;
        case data[entry].value < -70:
          count[2]++;
          break;
        case data[entry].value < -60:
          count[3]++;
          break;
        case data[entry].value < -50:
          count[4]++;
          break;
        case data[entry].value < -40:
          count[5]++;
          break;
        case data[entry].value < -30:
          count[6]++;
          break;
        case data[entry].value < -20:
          count[7]++;
          break;
        case data[entry].value < -10:
          count[8]++;
          break;
        case data[entry].value < 0:
          count[9]++;
          break;
        case data[entry].value < 10:
          count[10]++;
          break;
        case data[entry].value < 20:
          count[11]++;
          break;
        case data[entry].value < 30:
          count[12]++;
          break;
        case data[entry].value < 40:
          count[13]++;
          break;
        case data[entry].value < 50:
          count[14]++;
          break;
        case data[entry].value < 60:
          count[15]++;
          break;
        case data[entry].value < 70:
          count[16]++;
          break;
        case data[entry].value < 80:
          count[17]++;
          break;
        case data[entry].value < 90:
          count[18]++;
          break;
        case data[entry].value <= 100:
          count[19]++;
          break;
      }
    }
    return { ranges, count };
  };
  handleChange = e => {
    this.setState({ thresholdInput: e.target.value });
  };
  render() {
    const { timeStamps, values } = this.getTimeStampsAndValues(this.state.data);
    const { ranges, count } = this.getAmountOfNumbers(this.state.data);
    return (
      <div className="graphs-container">
        <LineChart timeStamps={timeStamps} values={values} />
        <BarChart ranges={ranges} count={count} />
        <label htmlFor="Enter a threshold">
          <input
            type="number"
            value={this.state.thresholdInput}
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}
export default Graphs;
