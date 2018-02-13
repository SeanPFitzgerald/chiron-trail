import React, { Component } from 'react'
import PrescriptionFormTile from '../components/PrescriptionFormTile'

class PrescriptionsFormAndIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      dosage: '',
      notes: '',
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDosageChange = this.handleDosageChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.checkErrors = this.checkErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleDosageChange(event) {
    this.setState({ dosage: event.target.value })
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value })
  }

  checkErrors() {
    const name = this.state.name
    const dosage = this.state.dosage
    let errors = []

    if(name === undefined || name === null || name === '') {
      errors.push('Must enter a medication name!')
    }
    if(dosage === undefined || dosage === null || dosage === '') {
      errors.push('Must enter a medication dosage!')
    }

    return errors
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = this.checkErrors()

    if (errors.length === 0) {
      const formPayload = {
        medication: {
          name: this.state.name,
          dosage: this.state.dosage
        },
        notes: this.state.notes
      }
      fetch('/api/v1/prescriptions', {
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
          dosage: '',
          notes: '',
          errors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors })
    }
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
          <PrescriptionFormTile
            handleSubmit={this.handleSubmit}
            changeName={this.handleNameChange}
            changeDosage={this.handleDosageChange}
            changeNotes={this.handleNotesChange}
            name={this.state.name}
            dosage={this.state.dosage}
            notes={this.state.notes}
          />
        </div>
      </div>
    )
  }
}

export default PrescriptionsFormAndIndexContainer
