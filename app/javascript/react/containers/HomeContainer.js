import React, { Component } from 'react'
import { Link } from 'react-router'
import C3Chart from 'react-c3js'


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
    //   data: {
    //     x: 'x',
    //     columns: [
    //       datesAxis,
    //       moodColumn,
    //       energyColumn,
    //       sociabilityColumn,
    //       clearMindednessColumn
    //     ]
    //   }
    // }
    const chartData = {
      Mood: [3, 2, 5, 4, 2, 5],
      Energy: [2, 3, 1, 4, 4, 3],
      Sociability: [1, 2, 1, 3, 2, 1],
      'Clear Mindedness': [2,4,5,4,2,3]
    }

    const LineChart = ({ data }) => <C3Chart data={{ json: data }} />;

    const BarChart = ({ data }) => <C3Chart data={{ json: data, type: 'bar' }} />

    return(
      <div className='row'>
        <h3>Hello, {this.props.currentUserName}!</h3>
        <div className='group'>
          <LineChart data={chartData} />
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
