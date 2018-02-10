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
      errors: []
    }

    this.createCheckboxes = this.createCheckboxes.bind(this)
    this.toggleCheckboxClick = this.toggleCheckboxClick.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)

  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  toggleCheckboxClick(event) {
    this.setState({ [event.target.id]: parseInt(event.target.text) })
  }

  handleNotesChange(event) {
    this.setState({ notes: event.target.value })
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

  render() {
    let moodCheckboxes = this.createCheckboxes('mood')
    let energyCheckboxes = this.createCheckboxes('energy')
    let sociabilityCheckboxes = this.createCheckboxes('sociability')
    let cmCheckboxes = this.createCheckboxes('clearMindedness')

    return(
      <div>
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
          <div>
            <DayPickerInput
              onDayChange={this.handleDayChange}
              value={this.state.selectedDay}
            />
          </div>
          <textarea value={this.state.notes} onChange={this.handleNotesChange} />
          <button type='submit' value='Submit'>Submit</button>
          <Link to="/"><button type="button">Back</button></Link>
        </form>
      </div>
    )
  }
}

export default WellnessChecksFormContainer
