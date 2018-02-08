import React, { Component } from 'react'
import PrescriptionFormTile from '../components/PrescriptionFormTile'

class TreatmentsFormsContainerTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPrescription: {
        name: '',
        dosage: '',
        notes: ''
      },
      scriptErrors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDosageChange = this.handleDosageChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.handlePrescriptionSubmit = this.handlePrescriptionSubmit.bind(this)
  }

  handleNameChange(event) {
    let script = Object.assign({}, this.state.newPrescription)
    script.name = event.target.value
    this.setState({ newPrescription: script })
  }

  handleDosageChange(event) {
    let script = Object.assign({}, this.state.newPrescription)
    script.dosage = event.target.value
    this.setState({ newPrescription: script })
  }

  handleNotesChange(event) {
    let script = Object.assign({}, this.state.newPrescription)
    script.notes = event.target.value
    this.setState({ newPrescription: script })
  }

  handlePrescriptionSubmit(event) {
    event.preventDefault()
    const name = this.state.newPrescription.name
    const dosage = this.state.newPrescription.dosage
    const notes = this.state.newPrescription.notes
    let errors = this.state.scriptErrors

    if(name === undefined || name === null || name === '') {
      errors.push('Must enter a medication name!')
    }
    if(dosage === undefined || dosage === null || dosage === '') {
      errors.push('Must enter a medication dosage!')
    }

    if (errors.length === 0) {
      const formPayload = {
        medication: {
          name: name,
          dosage: dosage
        },
        notes: notes
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
          newPrescription: {
            name: '',
            dosage: '',
            notes: ''
          },
          scriptErrors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ scriptErrors: errors })
    }
  }

  render() {
    let scriptErrorClass = ''
    let scriptErrorList
    let keyNum = 0
    if(this.state.scriptErrors.length > 0) {
      scriptErrorList = this.state.scriptErrors.map(error => {
        keyNum += 1
        return <li key={keyNum}>{error}</li>
      })
      scriptErrorClass = 'panel alert'
    }
    return(
      <div>
        <div className={scriptErrorClass}>{scriptErrorList}</div>
        <PrescriptionFormTile
          handleSubmit={this.handlePrescriptionSubmit}
          changeName={this.handleNameChange}
          changeDosage={this.handleDosageChange}
          changeNotes={this.handleNotesChange}
          name={this.state.newPrescription.name}
          dosage={this.state.newPrescription.dosage}
          notes={this.state.newPrescription.notes}
        />
      </div>
    )
  }
}

export default TreatmentsFormsContainerTest
