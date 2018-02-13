import React, { Component } from 'react'
import AppointmentFormTile from '../components/AppointmentFormTile'

class AppointmentsFormAndIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      selectedProvider: null,
      notes: '',
      providers: [],
      selectedDay: new Date(),
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleProviderChange = this.handleProviderChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
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

  handleDayChange(event) {
    this.setState({ selectedDay: event.target.value });
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
      const formPayload = {
        name: this.state.name,
        provider: this.state.selectedProvider,
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
      <div>
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
            selectedDay={this.state.selectedDay}
            notes={this.state.notes}
          />
        </div>
      </div>
    )
  }
}

export default AppointmentsFormAndIndexContainer
