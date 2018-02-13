import React, { Component } from 'react'
import LevelCheckbox from '../components/LevelCheckbox'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { Link } from 'react-router'

class WellnessChecksFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mood: null,
      energy: null,
      sociability: null,
      clearMindedness: null,
      selectedDay: new Date(),
      notes: '',
      status: '',
      errors: []
    }

    this.createCheckboxes = this.createCheckboxes.bind(this)
    this.toggleCheckboxClick = this.toggleCheckboxClick.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.errorCheck = this.errorCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  createCheckboxes(levelId) {
    let valueRange = Array.from(new Array(5),(val,index)=>index+1)

    return valueRange.map(num => {
      let currentClassName = ''

      if(this.state[levelId] === num) {
        currentClassName = 'current'
      }

      return <LevelCheckbox
        key={num}
        id={levelId}
        value={num}
        className={currentClassName}
        handleClick={this.toggleCheckboxClick}
      />
    })
  }

  toggleCheckboxClick(event) {
    this.setState({ [event.target.id]: parseInt(event.target.text) })
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value })
  }

  errorCheck() {
    let errors = []
    if(this.state.mood === null) {
      errors.push('Must enter your mood level!')
    }
    if(this.state.energy === null) {
      errors.push('Must enter your energy level!')
    }
    if(this.state.sociability === null) {
      errors.push('Must enter your sociability level!')
    }
    if(this.state.clearMindedness === null) {
      errors.push('Must enter your clear mindedness level!')
    }
    return errors
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = this.errorCheck()

    if(errors.length === 0) {
      const formPayload = {
        mood: this.state.mood,
        energy: this.state.energy,
        sociability: this.state.sociability,
        clear_mindedness: this.state.clearMindedness,
        date: this.state.selectedDay,
        notes: this.state.notes
      }
      fetch('/api/v1/wellness_checks', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          const errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(json => {
        if(json.message === this.state.status) {
          this.setState({ status: 'Successfully re-updated wellness check.', errors: [] })
        } else {
          this.setState({ status: json.message, errors: [] })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors })
    }
  }

  render() {
    let errorHTML
    let errorClass = ''
    if(this.state.errors.length > 0) {
      errorClass = 'panel alert'
      errorHTML = this.state.errors.map(error => {
        return <li>{error}</li>
      })
    }

    let statusClass
    if(this.state.status !== '') {
      statusClass = 'panel alert'
    }
    const moodCheckboxes = this.createCheckboxes('mood')
    const energyCheckboxes = this.createCheckboxes('energy')
    const sociabilityCheckboxes = this.createCheckboxes('sociability')
    const cmCheckboxes = this.createCheckboxes('clearMindedness')

    return(
      <div className='row panel small-8 small-centered columns'>
        <div className= {errorClass}>
        {errorHTML}
        </div>
        <div className= {statusClass}>
        {this.state.status}
        </div>
        <h3>Enter Wellness Check</h3>
        <form onSubmit={this.handleSubmit}>
          Mood:
          <ul className='pagination'>
            {moodCheckboxes}
          </ul>
          Energy:
          <ul className='pagination'>
            {energyCheckboxes}
          </ul>
          Sociability:
          <ul className='pagination'>
            {sociabilityCheckboxes}
          </ul>
          Clear Mindedness:
          <ul className='pagination'>
            {cmCheckboxes}
          </ul>
          Date:
          <div>
            <DayPickerInput
              onDayChange={this.handleDayChange}
              value={this.state.selectedDay}
            />
          </div>
          <textarea value={this.state.notes} onChange={this.handleNotesChange} />
          <button type='submit' value='Submit'>Submit</button>
          <Link to='/'><button type='button' className='backButton'>Back</button></Link>
        </form>
      </div>
    )
  }
}

export default WellnessChecksFormContainer
