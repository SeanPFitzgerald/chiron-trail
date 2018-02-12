import React, { Component } from 'react'
import PrescriptionFormTile from '../components/PrescriptionFormTile'
import ProviderFormTile from '../components/ProviderFormTile'

class TreatmentsFormsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPrescription: {
        name: '',
        dosage: '',
        notes: ''
      },
      newProvider: {
        name: '',
        type: ''
      },
      newAppointment: {
        name: '',
        notes: '',
        date: '',
        time: '',
        rule: '',
        interval: '',
        day: '',
        dayOfWeek: '',
        until: '',
        count: ''
      },
      scriptErrors: [],
      providerErrors: []
    }
    this.handleMedicationNameChange = this.handleMedicationNameChange.bind(this)
    this.handleDosageChange = this.handleDosageChange.bind(this)
    this.handleMedicationNotesChange = this.handleMedicationNotesChange.bind(this)
    this.checkPresciptionErrors = this.checkPresciptionErrors.bind(this)
    this.handlePrescriptionSubmit = this.handlePrescriptionSubmit.bind(this)
    this.handleProviderNameChange = this.handleProviderNameChange.bind(this)
    this.handleProviderTypeChange = this.handleProviderTypeChange.bind(this)
    this.handleProviderSubmit = this.handleProviderSubmit.bind(this)
  }

  handleMedicationNameChange(event) {
    let script = Object.assign({}, this.state.newPrescription)
    script.name = event.target.value
    this.setState({ newPrescription: script })
  }

  handleDosageChange(event) {
    let script = Object.assign({}, this.state.newPrescription)
    script.dosage = event.target.value
    this.setState({ newPrescription: script })
  }

  handleMedicationNotesChange(event) {
    let script = Object.assign({}, this.state.newPrescription)
    script.notes = event.target.value
    this.setState({ newPrescription: script })
  }

  handleProviderNameChange(event) {
    let provider = Object.assign({}, this.state.newProvider)
    provider.name = event.target.value
    this.setState({ newProvider: provider })
  }

  handleProviderTypeChange(event) {
    let provider = Object.assign({}, this.state.newProvider)
    provider.type = event.target.value
    this.setState({ newProvider: provider })
  }

  checkPresciptionErrors() {
    const name = this.state.newPrescription.name
    const dosage = this.state.newPrescription.dosage
    let errors = []

    if(name === undefined || name === null || name === '') {
      errors.push('Must enter a medication name!')
    }
    if(dosage === undefined || dosage === null || dosage === '') {
      errors.push('Must enter a medication dosage!')
    }

    return errors
  }

  checkProviderErrors() {
    const name = this.state.newPrescription.name
    const type = this.state.newPrescription.type
    let errors = []

    if(name === undefined || name === null || name === '') {
      errors.push('Must enter a provider name!')
    }
    if(type === undefined || type === null || type === '') {
      errors.push('Must enter a provider type!')
    }

    return errors
  }

  handlePrescriptionSubmit(event) {
    event.preventDefault()
    const errors = this.checkPresciptionErrors()

    if (errors.length === 0) {
      const formPayload = {
        medication: {
          name: this.state.newPrescription.name,
          dosage: this.state.newPrescription.dosage
        },
        notes: this.state.newPrescription.notes
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

  handleProviderSubmit(event) {
    event.preventDefault()
    const errors = this.checkProviderErrors()

    if (errors.length === 0) {
      const formPayload = {
        name: this.state.newProvider.name,
        provider_type: this.state.newProvider.type
      }
      fetch('/api/v1/providers', {
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
          newProvider: {
            name: '',
            provider_type: ''
          },
          providerErrors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      debugger
      this.setState({ providerErrors: errors })
    }
  }

  render() {
    let scriptErrorClass = ''
    let scriptErrorList
    if(this.state.scriptErrors.length > 0) {
      scriptErrorList = this.state.scriptErrors.map((error, index) => {
        return <li key={index}>{error}</li>
      })
      scriptErrorClass = 'panel alert'
    }
    let providerErrorClass = ''
    let providerErrorList
    if(this.state.providerErrors.length > 0) {
      providerErrorList = this.state.providerErrors.map((error, index) => {
        return <li key={index}>{error}</li>
      })
      providerErrorClass = 'panel alert'
    }
    return(
      <div>
        <div className={providerErrorClass}>{providerErrorList}</div>
        <div>
          <ProviderFormTile
            handleSubmit={this.handleProviderSubmit}
            changeName={this.handleProviderNameChange}
            changeType={this.handleProviderTypeChange}
            name={this.state.newProvider.name}
            type={this.state.newProvider.dosage}
          />
        </div>
        <div className={scriptErrorClass}>{scriptErrorList}</div>
        <div>
          <PrescriptionFormTile
            handleSubmit={this.handlePrescriptionSubmit}
            changeName={this.handleMedicationNameChange}
            changeDosage={this.handleDosageChange}
            changeNotes={this.handleMedicationNotesChange}
            name={this.state.newPrescription.name}
            dosage={this.state.newPrescription.dosage}
            notes={this.state.newPrescription.notes}
          />
        </div>
      </div>
    )
  }
}

export default TreatmentsFormsContainer
