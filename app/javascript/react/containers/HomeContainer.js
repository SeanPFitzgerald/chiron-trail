import React, { Component } from 'react'
import { Link } from 'react-router'
import C3Chart from 'react-c3js'
import c3 from 'react-c3js'


class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      mood: [],
      energy: [],
      sociability: [],
      clearMindedness: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/wellness_checks', {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        dates: json.dates,
        mood: json.mood,
        energy: json.energy,
        sociability: json.sociability,
        clearMindedness: json.clearMindedness
       })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    const datesAxis = ['x'].concat(this.state.dates)
    const moodColumn = ['Mood'].concat(this.state.mood)
    const energyColumn = ['Energy'].concat(this.state.energy)
    const sociabilityColumn = ['Sociability'].concat(this.state.sociability)
    const clearMindednessColumn = ['Clear Mindedness'].concat(this.state.clearMindedness)

    // const chartData = {
    //   columns: [
    //     ['x'].concat(this.state.dates),
    //     moodColumn,
    //     energyColumn,
    //     sociabilityColumn,
    //     clearMindednessColumn
    //   ]
    // }
    // const chartsData = {
    //       data: {
    //         // x: "x",
    //         columns: [
    //           // datesAxis,
    //           moodColumn,
    //           energyColumn,
    //           sociabilityColumn,
    //           clearMindednessColumn
    //         ]
    //       },
    //       axis: {
    //         x: {
    //           show: false,
    //           type: "timeseries"
    //         },
    //         y: {
    //           show: false
    //         }
    //       },
    //       legend: {
    //         show: false
    //       },
    //       point: {
    //         show: false
    //       }
    //     }
    // const chartData = {
    //         // xs: {
    //         //     setosa: 'setosa_x',
    //         //     versicolor: 'versicolor_x',
    //         // },
    //         // iris data from R
    //         columns: [
    //           ['date', 3, 4, 5, 6, 7, 8]
    //           ['Mood', 3, 2, 5, 4, 2, 5],
    //           ['Energy', 2, 3, 1, 4, 4, 3],
    //           ['Sociability', 1, 2, 1, 3, 2, 1],
    //           ['Clear Mindedness',2,4,5,4,2,3]
    //         ]
    //   };
    var chart = {
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 340, 200, 500, 250, 350]
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
};
debugger
      const axis = {
      x: {
        type: 'timeseries',
        label: {
          text: 'Time',
          position: 'outer-center'
        }
      }
    }

    const LineChart = ({ data }) =>
  <C3Chart data={{ json: data }} />;

const BarChart = ({ data, axis }) =>
  <C3Chart data={{ json: data, type: 'bar'}} />;

const chartData = {
  line: {
    data1: [30, 20, 50, 40, 60, 50],
    data2: [200, 130, 90, 240, 130, 220],
    data3: [300, 200, 160, 400, 250, 250]
  },
  bar: {
    data1: [30, 200, 100, 400, 150, 250],
    data2: [130, 100, 140, 200, 150, 50]
  }
};

    return(
      <div className='row'>
        <h3>Hello, {this.props.currentUserName}!</h3>
        <div className='group'>
    <C3Chart data={{json: chart.data.columns}} />
          <Link to='/providers/new' className='homeButtons'><button>Providers</button></Link>
          <Link to='/prescriptions/new' className='homeButtons'><button>Prescriptions</button></Link>
          <Link to='/appointments/new' className='homeButtons'><button>Appointments</button></Link>
          <Link to='/wellness_checks/new' className='homeButtons'><button>Enter New Wellness Check</button></Link>
      </div>
      </div>
    )
  }
}

export default HomeContainer
