import React, { Component } from 'react'
import ProviderFormTile from '../components/ProviderFormTile'
import ProviderIndexTile from '../components/ProviderIndexTile'
import ProviderEditTile from '../components/ProviderEditTile'
import NavBar from '../components/NavBar'

class ProvidersFormAndIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      providers: [],
      editedName: '',
      editedType: '',
      editNum: undefined,
      errors: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.editNameChange = this.editNameChange.bind(this)
    this.editTypeChange = this.editTypeChange.bind(this)
    this.checkErrors = this.checkErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.editProvider = this.editProvider.bind(this)
    this.updateTile = this.updateTile.bind(this)
    this.fetchAllProviders = this.fetchAllProviders.bind(this)
    this.createProviderIndex = this.createProviderIndex.bind(this)
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value })
  }

  editNameChange(event) {
    this.setState({ editedName: event.target.value })
  }

  editTypeChange(event) {
    this.setState({ editedType: event.target.value })
  }

  checkErrors() {
    const name = this.state.name
    const type = this.state.type
    let errors = []

    if (name === undefined || name === null || name === '') {
      errors.push('Must enter a provider name!')
    }
    if (type === undefined || type === null || type === '') {
      errors.push('Must enter a provider type!')
    }

    return errors
  }

  checkEditErrors(name, type) {
    let errors = []

    if (name === undefined || name === null || name === '') {
      errors.push('Must enter a provider name!')
    }
    if (type === undefined || type === null || type === '') {
      errors.push('Must enter a provider type!')
    }

    return errors
  }

  updateTile(event) {
    event.preventDefault()
    const name = document.getElementById('providerEditTile').getElementsByTagName('input')[0].value
    const type = document.getElementById('providerEditTile').getElementsByTagName('input')[1].value
    const errors = this.checkEditErrors(name, type)

    if (errors.length === 0 ) {
      const formPayload = {
        id: this.state.editNum,
        name: name,
        provider_type: type
      }
      fetch('/api/v1/providers?method=PATCH', {
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
          type: '',
          editedName: '',
          editedType: '',
          editNum: undefined,
          providers: json,
          errors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    } else {
      this.setState({ errors: errors })
    }
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
      .then(response => response.json())
      .then(json => {
        this.setState({
          name: '',
          type: '',
          editedName: '',
          editedType: '',
          editNum: undefined,
          providers: json,
          errors: []
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
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

  editProvider(event) {
    event.preventDefault()
    this.setState({ editNum: parseInt(event.target.id) })
  }

  createProviderIndex() {
    let providerClass = ''
    let providerList
    let providerTitle = ''
    if (this.state.providers.length > 0) {
      providerList = this.state.providers.map((provider, index) => {
        if (this.state.editNum !== undefined && provider.id === this.state.editNum) {
          const name = (this.state.editedName === '') ? provider.name : this.state.editedName
          const type = (this.state.editedType === '') ? provider.provider_type : this.state.editedType

          return(
            <ProviderEditTile
              key={index}
              id={provider.id}
              name={name}
              providerType={type}
              changeName={this.editNameChange}
              changeType={this.editTypeChange}
              handleUpdate={this.updateTile}
            />
          )
        } else {
          return(
            <ProviderIndexTile
              key={index}
              id={provider.id}
              name={provider.name}
              providerType={provider.provider_type}
              handleEdit={this.editProvider}
            />
          )
        }
      })
      providerClass = 'row panel small-8 small-centered columns'
      providerTitle = 'Your Providers:'
    }

    return(
      <div className={providerClass}>
        <h4>{providerTitle}</h4>
        <ul>
          {providerList}
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

    return(
      <div>
        <NavBar />
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
        </div>
        {this.createProviderIndex()}
      </div>
    )
  }
}

export default ProvidersFormAndIndexContainer
