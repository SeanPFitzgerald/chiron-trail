import React, { Component } from 'react'
import PrescriptionFormTile from '../components/PrescriptionFormTile'
import PrescriptionIndexTile from '../components/PrescriptionIndexTile'
import PrescriptionEditTile from '../components/PrescriptionEditTile'
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
      selectedDays: ['', moment().format('dddd')],
      rule: 'singular',
      editedName: '',
      editedDosage: '',
      editedNotes: '',
      editedDate: '',
      editedTime: '',
      editedDays: [''],
      editedRule: '',
      editNum: undefined,
      editId: undefined,
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
    this.createPrescriptionsIndex = this.createPrescriptionsIndex.bind(this)
    this.editPrescription = this.editPrescription.bind(this)
    this.editNameChange = this.editNameChange.bind(this)
    this.editDosageChange = this.editDosageChange.bind(this)
    this.editNotesChange = this.editNotesChange.bind(this)
    this.editDateChange = this.editDateChange.bind(this)
    this.editTimeChange = this.editTimeChange.bind(this)
    this.editRuleChange = this.editRuleChange.bind(this)
    this.createEditCheckboxes = this.createEditCheckboxes.bind(this)
    this.toggleEditCheckboxClick = this.toggleEditCheckboxClick.bind(this)
    this.checkEditErrors = this.checkEditErrors.bind(this)
    this.updateTile = this.updateTile.bind(this)
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

    if (name === undefined || name === null || name === '') {
      errors.push('Must enter a medication name!')
    }
    if (dosage === undefined || dosage === null || dosage === '') {
      errors.push('Must enter a medication dosage!')
    }

    return errors
  }

  handleDateChange(event) {
    const dateMoment = moment(new Date(`${event.year()}-${event.month() + 1}-${event.date()} 00:00`))
    const dateDay = dateMoment.format('dddd')

    if (this.state.rule === 'custom') {
      if (this.state.selectedDays.includes(dateDay)) {
        this.setState({ selectedDate: dateMoment })
      } else if (this.state.selectedDays.length <= 2){
        this.setState({ selectedDate: dateMoment, selectedDays: ['', dateDay], rule: 'singular' })
      } else if (this.state.selectedDays.length === 7) {
        this.setState({ selectedDate: dateMoment, selectedDays: this.state.selectedDays.concat(dateDay), rule: 'daily' })
      } else {
        this.setState({ selectedDate: dateMoment, selectedDays: this.state.selectedDays.concat(dateDay) })
      }
    } else if (this.state.rule === '') {
      if (this.state.selectedDays.length === 8) {
        this.setState({ selectedDate: dateMoment, rule: 'daily' })
      } else if (this.state.selectedDays.length === 7) {
        this.setState({ selectedDate: dateMoment, selectedDays: this.state.selectedDays.concat(dateDay), rule: 'daily' })
      } else if (this.state.selectedDays.length > 1) {
        this.setState({ selectedDate: dateMoment, selectedDays: this.state.selectedDays.concat(dateDay), rule: 'custom' })
      } else {
        this.setState({ selectedDate: dateMoment, selectedDays: ['', dateDay], rule: 'singular' })
      }
    } else if (this.state.rule === 'daily') {
      this.setState({ selectedDate: dateMoment })
    } else {
      this.setState({ selectedDate: dateMoment, selectedDays: ['', dateDay] })
    }
  }

  handleTimeChange(event) {
    const timeMoment = moment(new Date(`${event.year()}-${event.month() + 1}-${event.date()} ${event.hour()}:${event.minute()}`))
    this.setState({ selectedTime: timeMoment })
  }

  handleRuleChange(event) {
    const rule = event.target.value
    if (this.state.selectedDate !== '') {
      const dateDay = this.state.selectedDate.format('dddd')

      if (rule === 'daily') {
        this.setState({ rule: rule, selectedDays: ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] })
      } else if (rule !== 'custom') {
        this.setState({ rule: rule, selectedDays: ['', dateDay] })
      } else {
        this.setState({ rule: rule })
      }
    } else if (rule === 'daily') {
      this.setState({ rule: rule, selectedDays: ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] })
    }
  }

  toggleCheckboxClick(event) {
    event.preventDefault()

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const selected = this.state.selectedDays
    let newDays = []

    if (selected.includes(event.target.id)) {
      newDays = selected.filter(day => {
        return day != event.target.id
      })
    } else {
      newDays = days.filter(day => {
        return (selected.includes(day) || day == event.target.id)
      })
      newDays.unshift('')
    }

    if (this.state.selectedDate === '') {
      if (newDays.length === 8) {
        this.setState({ selectedDays: newDays, selectedDate: moment(), rule: 'daily' })
      } else {
        this.setState({ selectedDays: newDays, rule: '' })
      }
    } else {
      if (newDays.includes(this.state.selectedDate.format('dddd'))) {
        if (newDays.length === 8) {
          this.setState({ selectedDays: newDays, rule: 'daily' })
        } else if (newDays.length === 2) {
          if (this.state.rule === 'custom') {
            this.setState({ selectedDays: newDays, rule: 'weekly' })
          } else {
            this.setState({ selectedDays: newDays })
          }
        } else if (newDays.length === 1) {
          this.setState({ selectedDays: newDays, rule: '' })
        } else {
          this.setState({ selectedDays: newDays, rule: 'custom' })
        }
      } else if (newDays.length === 1) {
        this.setState({ selectedDays: [''], selectedDate: '', rule: '' })
      } else {
        this.setState({ selectedDays: newDays, rule: 'custom', selectedDate: '', rule: '' })
      }
    }
  }

  createCheckboxes() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return days.map((day, index) => {
      let currentClassName = 'day'

      if (this.state.selectedDays.includes(day)) {
        currentClassName += ' current'
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
      const momentDate = this.state.selectedDate.utc()
      const momentTime = this.state.selectedTime.utc()
      let rule = this.state.rule
      if (rule === 'custom') {
        rule = 'weekly'
      }
      const formPayload = {
        medication: {
          name: this.state.name,
          dosage: this.state.dosage,
        },
        prescription: {
          'date(1i)': momentDate.year().toString(),
          'date(2i)': (momentDate.month() + 1).toString(),
          'date(3i)': momentDate.date().toString(),
          'time(1i)': momentDate.year().toString(),
          'time(2i)': (momentDate.month() + 1).toString(),
          'time(3i)': momentDate.date().toString(),
          'time(4i)': momentTime.hour().toString(),
          'time(5i)': momentTime.minute().toString(),
          day: days,
          rule: rule,
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
          notes: '',
          prescriptions: json,
          defaultTime: moment('12', 'HH'),
          selectedDate: moment(),
          selectedTime: moment('12', 'HH'),
          selectedDays: ['', moment().format('dddd')],
          rule: 'singular',
          editedName: '',
          editedDosage: '',
          editedNotes: '',
          editedDate: '',
          editedTime: '',
          editedDays: [''],
          editedRule: '',
          editNum: undefined,
          errors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    } else {
      this.setState({ errors: errors })
    }
  }

  editPrescription(event) {
    event.preventDefault()
    const script = this.state.prescriptions[event.target.id]

    const days = script.schedule.day.map((day) => {
      return day.slice(0, 1).toUpperCase().concat(day.slice(1))
    })

    let rule = script.schedule.rule
    if (rule === 'weekly' && days.length > 2) {
      rule = 'custom'
    }

    this.setState({
      editNum: parseInt(event.target.id),
      editId: script.id,
      editedName: script.medication.name,
      editedDosage: script.medication.dosage,
      editedNotes: script.notes,
      editedDate: moment(new Date(`${script.schedule.date} 00:00`)),
      editedTime: moment(new Date(script.schedule.time)),
      editedDays: [''].concat(days),
      editedRule: rule
    })
  }

  editNameChange(event) {
    this.setState({ editedName: event.target.value })
  }

  editDosageChange(event) {
    this.setState({ editedDosage: event.target.value })
  }

  editNotesChange(event) {
    this.setState({ editedNotes: event.target.value })
  }

  editDateChange(event) {
    const dateMoment = moment(new Date(`${event.year()}-${event.month() + 1}-${event.date()} 00:00`))
    const dateDay = dateMoment.format('dddd')

    if (this.state.editedRule === 'custom') {
      if (this.state.editedDays.includes(dateDay)) {
        this.setState({ editedDate: dateMoment })
      } else if (this.state.editedDays.length <= 2){
        this.setState({ editedDate: dateMoment, editedDays: ['', dateDay], editedRule: 'singular' })
      } else if (this.state.editedDays.length === 7) {
        this.setState({ editedDate: dateMoment, editedDays: this.state.editedDays.concat(dateDay), editedRule: 'daily' })
      } else {
        this.setState({ editedDate: dateMoment, editedDays: this.state.editedDays.concat(dateDay) })
      }
    } else if (this.state.editedRule === '') {
      if (this.state.editedDays.length === 8) {
        this.setState({ editedDate: dateMoment, editedRule: 'daily' })
      } else if (this.state.editedDays.length === 7) {
        this.setState({ editedDate: dateMoment, editedDays: this.state.editedDays.concat(dateDay), editedRule: 'daily' })
      } else if (this.state.editedDays.length > 1) {
        this.setState({ editedDate: dateMoment, editedDays: this.state.editedDays.concat(dateDay), editedRule: 'custom' })
      } else {
        this.setState({ editedDate: dateMoment, editedDays: ['', dateDay], editedRule: 'singular' })
      }
    } else if (this.state.editedRule === 'daily') {
      this.setState({ editedDate: dateMoment })
    } else {
      this.setState({ editedDate: dateMoment, editedDays: ['', dateDay] })
    }
  }

  editTimeChange(event) {
    const timeMoment = moment(new Date(`${event.year()}-${event.month() + 1}-${event.date()} ${event.hour()}:${event.minute()}`))
    this.setState({ selectedTime: timeMoment })
  }

  editRuleChange(event) {
    const rule = event.target.value
    if (this.state.editedDate !== '') {
      const dateDay = this.state.editedDate.format('dddd')

      if (rule === 'daily') {
        this.setState({ editedRule: rule, editedDays: ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] })
      } else if (rule !== 'custom') {
        this.setState({ editedRule: rule, editedDays: ['', dateDay] })
      } else {
        this.setState({ editedRule: rule })
      }
    } else if (rule === 'daily') {
      this.setState({ editedRule: rule, editedDays: ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] })
    }
  }

  createEditCheckboxes() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return days.map((day, index) => {
      let currentClassName = 'day edit'

      if (this.state.editedDays.includes(day)) {
        currentClassName += ' current'
      }

      return <Checkbox
               key={index + 7}
               id={day}
               value={day.slice(0,3)}
               className={currentClassName}
               handleClick={this.toggleEditCheckboxClick}
             />
    })
  }

  toggleEditCheckboxClick(event) {
    event.preventDefault()

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const selected = this.state.editedDays
    let newDays = []

    if (selected.includes(event.target.id)) {
      newDays = selected.filter(day => {
        return day != event.target.id
      })
    } else {
      newDays = days.filter(day => {
        return (selected.includes(day) || day == event.target.id)
      })
      newDays.unshift('')
    }

    if (this.state.editedDate === '') {
      if (newDays.length === 8) {
        this.setState({ editedDays: newDays, editedDate: moment(), editedRule: 'daily' })
      } else {
        this.setState({ editedDays: newDays, editedRule: '' })
      }
    } else {
      if (newDays.includes(this.state.editedDate.format('dddd'))) {
        if (newDays.length === 8) {
          this.setState({ editedDays: newDays, editedRule: 'daily' })
        } else if (newDays.length === 2) {
          if (this.state.editedRule === 'custom') {
            this.setState({ editedDays: newDays, editedRule: 'weekly' })
          } else {
            this.setState({ editedDays: newDays })
          }
        } else if (newDays.length === 1) {
          this.setState({ editedDays: newDays, editedRule: '' })
        } else {
          this.setState({ editedDays: newDays, editedRule: 'custom' })
        }
      } else if (newDays.length === 1) {
        this.setState({ editedDays: [''], editedDate: '', editedRule: '' })
      } else {
        this.setState({ editedDays: newDays, editedRule: 'custom', editedDate: '', editedRule: '' })
      }
    }
  }

  checkEditErrors(name, dosage) {
    let errors = []

    if (name === undefined || name === null || name === '') {
      errors.push('Must enter a medication name!')
    }
    if (dosage === undefined || dosage === null || dosage === '') {
      errors.push('Must enter a medication dosage!')
    }

    return errors
  }

  updateTile(event) {
    event.preventDefault()
    const errors = this.checkEditErrors(this.state.editedName, this.state.editedDosage)

    if (errors.length === 0) {
      let days = this.state.editedDays.map(day => {
        return day.toLowerCase()
      })
      const momentDate = this.state.editedDate.utc()
      const momentTime = this.state.editedTime.utc()
      let rule = this.state.editedRule
      if (rule === 'custom') {
        rule = 'weekly'
      }
      const formPayload = {
        medication: {
          name: this.state.editedName,
          dosage: this.state.editedDosage,
        },
        prescription: {
          id: this.state.editId,
          'date(1i)': momentDate.year().toString(),
          'date(2i)': (momentDate.month() + 1).toString(),
          'date(3i)': momentDate.date().toString(),
          'time(1i)': momentDate.year().toString(),
          'time(2i)': (momentDate.month() + 1).toString(),
          'time(3i)': momentDate.date().toString(),
          'time(4i)': momentTime.hour().toString(),
          'time(5i)': momentTime.minute().toString(),
          day: days,
          rule: rule,
          notes: this.state.editedNotes
        }
      }
      fetch('/api/v1/prescriptions?method=PATCH', {
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
          notes: '',
          prescriptions: json,
          defaultTime: moment('12', 'HH'),
          selectedDate: moment(),
          selectedTime: moment('12', 'HH'),
          selectedDays: ['', moment().format('dddd')],
          rule: 'singular',
          editedName: '',
          editedDosage: '',
          editedNotes: '',
          editedDate: '',
          editedTime: '',
          editedDays: [''],
          editedRule: '',
          editNum: undefined,
          errors: []
        })
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

  createPrescriptionsIndex() {
    let prescriptionClass = ''
    let prescriptionList
    let prescriptionTitle = ''
    if (this.state.prescriptions.length > 0) {
      prescriptionList = this.state.prescriptions.map((prescription, index) => {
        if (this.state.editNum !== undefined && index === this.state.editNum) {
          const notes = (this.state.editedNotes === '') ? 'None' : this.state.editedNotes
          const weekCheckboxes = this.createEditCheckboxes()
          return(
            <PrescriptionEditTile
              key={index}
              id={index}
              handleUpdate={this.updateTile}
              changeName={this.editNameChange}
              changeDosage={this.editDosageChange}
              changeNotes={this.editNotesChange}
              name={this.state.editedName}
              dosage={this.state.editedDosage}
              selectedDate={this.state.editedDate}
              changeDate={this.editDateChange}
              defaultTime={this.state.editedTime}
              changeTime={this.editTimeChange}
              defaultRule={this.state.editedRule}
              changeRule={this.editRuleChange}
              daysCheckboxes={weekCheckboxes}
              notes={notes}
            />
          )
        } else {
          const date = moment(prescription.schedule.date)
          const time = moment(prescription.schedule.time)
          return(
            <PrescriptionIndexTile
              key={index}
              id={index}
              name={prescription.medication.name}
              dosage={prescription.medication.dosage}
              date={date}
              time={time}
              notes={prescription.notes}
              handleEdit={this.editPrescription}
            />
          )
        }
      })
      prescriptionClass = 'row panel small-8 small-centered columns'
      prescriptionTitle = 'Your Prescriptions:'
    }

    return(
      <div className={prescriptionClass}>
        <h4>{prescriptionTitle}</h4>
        <ul>
          {prescriptionList}
        </ul>
      </div>
    )
  }

  render() {
    let errorClass = ''
    let errorList
    if (this.state.errors.length > 0) {
      errorList = this.state.errors.map((error, index) => {
        return <li key={index}>{error}</li>
      })
      errorClass = 'panel alert'
    }

    const weekCheckboxes = this.createCheckboxes()

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
              selectedDate={this.state.selectedDate}
              changeDate={this.handleDateChange}
              defaultTime={this.state.defaultTime}
              changeTime={this.handleTimeChange}
              defaultRule={this.state.rule}
              changeRule={this.handleRuleChange}
              daysCheckboxes={weekCheckboxes}
              notes={this.state.notes}
            />
          </div>
        </div>
        {this.createPrescriptionsIndex()}
      </div>
    )
  }
}

export default PrescriptionsFormAndIndexContainer
