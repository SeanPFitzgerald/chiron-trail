import React, { Component } from 'react'
import ProviderFormTile from '../components/ProviderFormTile'

class ProvidersFormAndIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      providers: [],
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.checkErrors = this.checkErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchAllProviders = this.fetchAllProviders.bind(this)
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value })
  }

  checkErrors() {
    const name = this.state.name
    const type = this.state.type
    let errors = []

    if(name === undefined || name === null || name === '') {
      errors.push('Must enter a provider name!')
    }
    if(type === undefined || type === null || type === '') {
      errors.push('Must enter a provider type!')
    }

    return errors
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = this.checkErrors()

    if (errors.length === 0) {
      const formPayload = {
        name: this.state.name,
        provider_type: this.state.type
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
          name: '',
          type: '',
          errors: []
        })
        this.fetchAllProviders()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ errors: errors })
    }
  }

  fetchAllProviders() {
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
      this.setState({ providers: json })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  componentDidMount() {
    this.fetchAllProviders()
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

    let providerClass = ''
    let providerList
    if(this.state.providers.length > 0) {
      providerList = this.state.providers.map((provider, index) => {
        return <li key={index}><strong>Name:</strong> {provider.name} <ol><strong>Type:</strong> {provider.provider_type}</ol><br /></li>
      })
      providerClass = 'row panel small-8 small-centered columns'
    }

    return(
      <div className='row panel small-8 small-centered columns'>
        <div className={errorClass}>{errorList}</div>
        <div>
          <ProviderFormTile
            handleSubmit={this.handleSubmit}
            changeName={this.handleNameChange}
            changeType={this.handleTypeChange}
            name={this.state.name}
            type={this.state.type}
          />
        </div>
        <div className={providerClass}>
          <ul>
            {providerList}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProvidersFormAndIndexContainer
