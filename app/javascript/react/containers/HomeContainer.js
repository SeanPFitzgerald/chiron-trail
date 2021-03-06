import React, { Component } from 'react'
import C3Chart from 'react-c3js'
import c3 from 'c3'
import moment from 'moment'
import * as Datetime from 'react-datetime'
import Checkbox from '../components/Checkbox'
import NavBar from '../components/NavBar'


class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      mood: [],
      energy: [],
      sociability: [],
      clearMindedness: [],
      graphType: 'Line',
      fromDate: null,
      toDate: null
    }

    this.createCheckboxes = this.createCheckboxes.bind(this)
    this.toggleCheckboxClick = this.toggleCheckboxClick.bind(this)
    this.changeFromDate = this.changeFromDate.bind(this)
    this.changeToDate = this.changeToDate.bind(this)
    this.createDateRange = this.createDateRange.bind(this)
    this.fetchNewChartData = this.fetchNewChartData.bind(this)
  }

  changeFromDate(event) {
    const fromDateMoment = moment(new Date(`${event.year()}-${event.month()+1}-${event.date()} 00:00`))
    this.fetchNewChartData(fromDateMoment, this.state.toDate)
  }

  changeToDate(event) {
    const toDateMoment = moment(new Date(`${event.year()}-${event.month()+1}-${event.date()} 00:00`))
    this.fetchNewChartData(this.state.fromDate, toDateMoment)
  }

  fetchNewChartData(fromDate, toDate) {
    fetch(`/api/v1/wellness_checks?from=${fromDate.utc().toString()}&to=${toDate.utc().toString()}`, {
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
        clearMindedness: json.clearMindedness,
        fromDate: fromDate,
        toDate: toDate
       })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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
        clearMindedness: json.clearMindedness,
        fromDate: moment(json.dates[0]),
        toDate: moment(json.dates.slice(-1)[0])
       })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }


  toggleCheckboxClick(event) {
    event.preventDefault()
    this.setState({ graphType: event.target.id })
  }

  createCheckboxes() {
    let types = ['Line', 'Bar']

    return types.map((type, index) => {
      let currentClassName = 'graph-type'

      if(this.state.graphType === type) {
        currentClassName += ' current'
      }

      return <Checkbox
               key={index}
               id={type}
               value={type}
               className={currentClassName}
               handleClick={this.toggleCheckboxClick}
             />
    })
  }

  createDateRange() {
    return <div>Date Range:
             <div className='row'>
               <label className='small-6 large-6 columns'>From
               <div>
                 <Datetime
                   timeFormat={false}
                   onChange={this.changeFromDate}
                   defaultValue={this.state.fromDate}
                 />
               </div>
             </label>

             <label className='small-6 large-6 columns'>To
               <div>
                 <Datetime
                   timeFormat={false}
                   onChange={this.changeToDate}
                   defaultValue={this.state.toDate}
                 />
               </div>
             </label>
           </div>
         </div>
  }

  render() {
    const datesAxis = ['x'].concat(this.state.dates)
    const moodColumn = ['Mood'].concat(this.state.mood)
    const energyColumn = ['Energy'].concat(this.state.energy)
    const sociabilityColumn = ['Sociability'].concat(this.state.sociability)
    const clearMindednessColumn = ['Clear-Mindedness'].concat(this.state.clearMindedness)

    if(this.state.graphType === 'Line') {
      c3.generate({
        bindto: "#chart",
        data: {
          x: 'x',
          columns: [
            datesAxis,
            moodColumn,
            energyColumn,
            sociabilityColumn,
            clearMindednessColumn
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
              rotate: 90
            }
          },
          y: {
            tick : {
              values: [1, 2, 3, 4, 5]
            },
            min: 1,
            max: 5
          }
        }
      })
    } else {
      c3.generate({
        bindto: "#chart",
        data: {
          x: 'x',
          columns: [
            datesAxis,
            moodColumn,
            energyColumn,
            sociabilityColumn,
            clearMindednessColumn
          ],
          type: 'bar',
          groups: [
            ['Mood', 'Energy', 'Sociability', 'Clear-Mindedness']
          ]
        },
        bar: {
          width: {
            ratio: 0.2
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
              rotate: 90
            }
          }
        }
      })
    }

    const graphTypes = this.createCheckboxes()
    let dateRange = ''
    if(this.state.fromDate !== null) {
      dateRange = this.createDateRange()
    }
    return(
      <div className='row small-10 large-10 small-centered large-centered columns'>
        <NavBar />
        <div className='small-10 large-10 small-centered large-centered columns'>
          <h3>Hello, {this.props.currentUserName}!</h3>
          <div className='group'>
            <ul className='pagination'>
              {graphTypes}
            </ul>

            <div id='chart'/>

            {dateRange}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeContainer
