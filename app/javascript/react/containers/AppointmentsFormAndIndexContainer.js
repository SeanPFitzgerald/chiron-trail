import React, { Component } from 'react'
import AppointmentFormTile from '../components/AppointmentFormTile'
import Checkbox from '../components/Checkbox'
import moment from 'moment'

class AppointmentsFormAndIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      selectedProvider: null,
      notes: '',
      providers: [],
      defaultTime: moment('12', 'HH'),
      selectedDate: moment(),
      selectedTime: moment('12', 'HH'),
      selectedDays: [""],
      rule: 'singular',
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleProviderChange = this.handleProviderChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleRuleChange = this.handleRuleChange.bind(this)
    this.toggleCheckboxClick = this.toggleCheckboxClick.bind(this)
    this.createCheckboxes = this.createCheckboxes.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.checkErrors = this.checkErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleProviderChange(event) {
    this.setState({ selectedProvider: event.target.value })
  }

  handleDateChange(event) {
    this.setState({ selectedDate: event._d });
  }

  handleTimeChange(event) {
    this.setState({ selectedTime: event._d });
  }

  handleRuleChange(event) {
    this.setState({ rule: event.target.value });
  }


  toggleCheckboxClick(event) {
    event.preventDefault()

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let newDays = []

    if(this.state.selectedDays.includes(event.target.id)) {
      newDays = this.state.selectedDays.filter(day => {
      	return day != event.target.id
      })
    } else {
      newDays = days.filter(day => {
      	return (this.state.selectedDays.includes(day) || day == event.target.id)
      })
      newDays.unshift("")
    }

    this.setState({ selectedDays: newDays })
  }

  createCheckboxes() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return days.map((day, index) => {
      let currentClassName = ''

      if(this.state.selectedDays.includes(day)) {
        currentClassName = 'current'
      }

      return <Checkbox
               key={index}
               id={day}
               value={day.slice(0,3)}
               className={currentClassName}
               handleClick={this.toggleCheckboxClick}
             />
    })
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value })
  }

  checkErrors() {
    const selectedProvider = this.state.selectedProvider
    let errors = []

    if(selectedProvider === undefined || selectedProvider === null || selectedProvider === '') {
      errors.push('Must select a provider!')
    }

    return errors
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = this.checkErrors()
    
    if (errors.length === 0) {
      let days = this.state.selectedDays.map(day => {
        return day.toLowerCase()
      })
      const formPayload = {
        appointment: {
          name: this.state.name,
          provider: this.state.selectedProvider,
          'date(1i)': (moment(this.state.selectedDate).year()).toString(),
          'date(2i)': (moment(this.state.selectedDate).month() + 1).toString(),
          'date(3i)': (moment(this.state.selectedDate).date()).toString(),
          'time(1i)': (moment(this.state.selectedDate).year()).toString(),
          'time(2i)': (moment(this.state.selectedDate).month() + 1).toString(),
          'time(3i)': (moment(this.state.selectedDate).date()).toString(),
          'time(4i)': (moment(this.state.selectedTime).hour()).toString(),
          'time(5i)': (moment(this.state.selectedTime).minute()).toString(),
          day: days,
          rule: this.state.rule,
          notes: this.state.notes
        }
      }
      fetch('/api/v1/appointments', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
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
      .then(response => {
        this.setState({
          name: '',
          selectedProvider: null,
          selectedDate: null,
          selectedTime: null,
          notes: '',
          errors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors })
    }
  }

  componentDidMount() {
    fetch('/api/v1/providers', {
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
      this.setState({ selectedProvider: json[0], providers: json })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let errorClass = ''
    let errorList
    if(this.state.errors.length > 0) {
      errorList = this.state.errors.map((error, index) => {
        return <li key={index}>{error}</li>
      })
      errorClass = 'panel alert'
    }
    const weekCheckboxes = this.createCheckboxes()

    return(
      <div className='row panel small-8 small-centered columns'>
        <div className={errorClass}>{errorList}</div>
        <div>
          <AppointmentFormTile
            handleSubmit={this.handleSubmit}
            changeName={this.handleNameChange}
            changeProvider={this.handleProviderChange}
            changeNotes={this.handleNotesChange}
            name={this.state.name}
            providers={this.state.providers}
            selectedProvider={this.state.selectedProvider}
            changeDate={this.handleDateChange}
            defaultTime={this.state.defaultTime}
            changeTime={this.handleTimeChange}
            changeRule={this.handleRuleChange}
            daysCheckboxes={weekCheckboxes}
            notes={this.state.notes}
          />
        </div>
      </div>
    )
  }
}

export default AppointmentsFormAndIndexContainer
