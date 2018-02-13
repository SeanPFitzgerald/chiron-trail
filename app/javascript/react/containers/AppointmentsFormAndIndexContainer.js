import React, { Component } from 'react'
import AppointmentFormTile from '../components/AppointmentFormTile'
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
      selectedDate: null,
      selectedTime: null,
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleProviderChange = this.handleProviderChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
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
    this.setState({ selectedDate: event._d.toDateString() });
  }

  handleTimeChange(event) {
    this.setState({ selectedTime: event._d.toTimeString() });
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
debugger
    if (errors.length === 0) {
      const formPayload = {
        name: this.state.name,
        provider: this.state.selectedProvider,
        date: this.state.selectedDate,
        time: this.state.selectedTime,
        notes: this.state.notes
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
    fetch('/api/v1/providers')
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
      this.setState({ providers: json })
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
            notes={this.state.notes}
          />
        </div>
      </div>
    )
  }
}

export default AppointmentsFormAndIndexContainer
