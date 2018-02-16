import React, { Component } from 'react'
import PrescriptionFormTile from '../components/PrescriptionFormTile'
import Checkbox from '../components/Checkbox'
import NavBar from '../components/NavBar'
import moment from 'moment'

class PrescriptionsFormAndIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      dosage: '',
      notes: '',
      prescriptions: [],
      defaultTime: moment('12', 'HH'),
      selectedDate: moment(),
      selectedTime: moment('12', 'HH'),
      selectedDays: [""],
      rule: 'daily',
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDosageChange = this.handleDosageChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleRuleChange = this.handleRuleChange.bind(this)
    this.toggleCheckboxClick = this.toggleCheckboxClick.bind(this)
    this.createCheckboxes = this.createCheckboxes.bind(this)
    this.checkErrors = this.checkErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchAllPrescriptions = this.fetchAllPrescriptions.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    const errors = this.checkErrors()

    if (errors.length === 0) {
      let days = this.state.selectedDays.map(day => {
        return day.toLowerCase()
      })
      debugger
      const formPayload = {
        medication: {
          name: this.state.name,
          dosage: this.state.dosage,
        },
        prescription: {
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
      .then(response => response.json())
      .then(json => {
        this.setState({
          name: '',
          dosage: '',
          selectedProvider: null,
          selectedDate: null,
          selectedTime: null,
          notes: '',
          errors: []
        })
        this.fetchAllPrescriptions()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    } else {
      this.setState({ errors: errors })
    }
  }

  fetchAllPrescriptions() {
    fetch('/api/v1/prescriptions', {
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
      this.setState({ prescriptions: json })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  componentDidMount() {
    this.fetchAllPrescriptions()
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

    let prescriptionClass = ''
    let prescriptionList
    if(this.state.prescriptions.length > 0) {
      prescriptionList = this.state.prescriptions.map((prescription, index) => {
        return <li key={index}>
                 <strong>Name:</strong> {prescription.medication.name}<br />
                 <strong>Dosage:</strong> {prescription.medication.dosage}
                 <ol>
                   Start Date: {moment(prescription.schedule.date).format('ddd, MMM Do YYYY')}<br />
                   Time: {moment(prescription.schedule.time).format('h:mm a')}<br />
                   Notes: {prescription.notes}
                 </ol>
               </li>
      })
      prescriptionClass = 'row panel small-8 small-centered columns'
    }

    let prescriptionTitle = ''
    if(prescriptionList !== undefined) {
      prescriptionTitle = 'Your Prescriptions:'
    }

    return(
      <div>
        <NavBar />
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
              changeDate={this.handleDateChange}
              defaultTime={this.state.defaultTime}
              changeTime={this.handleTimeChange}
              changeRule={this.handleRuleChange}
              daysCheckboxes={weekCheckboxes}
              notes={this.state.notes}
            />
          </div>
        </div>
        <div className={prescriptionClass}>
          <h4>{prescriptionTitle}</h4>
          <ul>
            {prescriptionList}
          </ul>
        </div>
      </div>
    )
  }
}

export default PrescriptionsFormAndIndexContainer
