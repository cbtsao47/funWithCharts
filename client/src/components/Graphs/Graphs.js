import React from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Graphs.css";
toast.configure()
class Graphs extends React.Component {
  state = {
    data: [],
    thresholdInput: 100,
    overThreshold: false,
    milestone:0
  };
  componentDidMount() {
    let socket = socketIOClient(process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000/');
    /**
     * Listens to 'data' event.
     * receive randomly generated data from backend.
     */
    socket.on("data", data => {
      if (data.value >= this.state.thresholdInput) {
        const notify =()=>toast('🥂 We did it!!!')
        notify()
        this.setState({milestone:data.value})
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
    for (let key in data) {
      timeStamps.push(data[key].timestamp);
      values.push(data[key].value);
    }
    return { timeStamps, values };
  };
  /**
   * Get `values` from data and returns an object containing the ranges and number of times the values appears in ranges ( from -100 to 100 )
   * @param array, `array of objects` containg values
   *
   * @returns object of 2 arrays ranges and count
   */

  //  TODO: refactor in the future for better readability
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
    for (let key in data) {
      switch (true) {
        case data[key].value < -90:
          count[0]++;
          break;
        case data[key].value < -80:
          count[1]++;
          break;
        case data[key].value < -70:
          count[2]++;
          break;
        case data[key].value < -60:
          count[3]++;
          break;
        case data[key].value < -50:
          count[4]++;
          break;
        case data[key].value < -40:
          count[5]++;
          break;
        case data[key].value < -30:
          count[6]++;
          break;
        case data[key].value < -20:
          count[7]++;
          break;
        case data[key].value < -10:
          count[8]++;
          break;
        case data[key].value < 0:
          count[9]++;
          break;
        case data[key].value < 10:
          count[10]++;
          break;
        case data[key].value < 20:
          count[11]++;
          break;
        case data[key].value < 30:
          count[12]++;
          break;
        case data[key].value < 40:
          count[13]++;
          break;
        case data[key].value < 50:
          count[14]++;
          break;
        case data[key].value < 60:
          count[15]++;
          break;
        case data[key].value < 70:
          count[16]++;
          break;
        case data[key].value < 80:
          count[17]++;
          break;
        case data[key].value < 90:
          count[18]++;
          break;
        case data[key].value <= 100:
          count[19]++;
          break;
        default:
        console.log('something wrong with data in graph.js')
          break
      }
    }
    return { ranges, count };
  };
  handleChange = e => {
    this.setState({ thresholdInput: e.target.value });
  };
  render() {
  const {milestone}=this.state
    const { timeStamps, values } = this.getTimeStampsAndValues(this.state.data);
    const { ranges, count } = this.getAmountOfNumbers(this.state.data);
    return (
      <div className="graphs-container">
      <div className='inputs-container'>

        <label>Milestone Reached
        <p className='milestone'>{milestone}</p>
        </label>
        <label htmlFor="threshold">
        Enter a threshold
          <input
          className='threshold-input'
          id='threshold'
          type="number"
          value={this.state.thresholdInput}
          onChange={this.handleChange}
          />
        </label>
          </div>
        <LineChart timeStamps={timeStamps} values={values} />
        <BarChart ranges={ranges} count={count} />
      </div>
    );
  }
}
export default Graphs;
