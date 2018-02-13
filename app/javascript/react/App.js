import React from 'react'
import HomeContainer from './containers/HomeContainer'
import ProvidersFormAndIndexContainer from './containers/ProvidersFormAndIndexContainer'
import PrescriptionsFormAndIndexContainer from './containers/PrescriptionsFormAndIndexContainer'
import AppointmentsFormAndIndexContainer from './containers/AppointmentsFormAndIndexContainer'
import WellnessChecksFormContainer from './containers/WellnessChecksFormContainer'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

const App = (props) => {
  let HomeContainerWrapper = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <HomeContainer
             currentUserId={user.id}
             currentUserName={user.name}
             {...props}
           />
  })

  let ProvidersFormAndIndexContainerWrapper = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <ProvidersFormAndIndexContainer
             currentUserId={user.id}
             currentUserName={user.name}
             {...props}
           />
  })

  let PrescriptionsFormAndIndexContainerWrapper = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <PrescriptionsFormAndIndexContainer
             currentUserId={user.id}
             currentUserName={user.name}
             {...props}
           />
  })

  let AppointmentsFormAndIndexContainerWrapper = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <AppointmentsFormAndIndexContainer
             currentUserId={user.id}
             currentUserName={user.name}
             {...props}
           />
  })

  let WellnessContainerWrapper = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <WellnessChecksFormContainer
             currentUserId={user.id}
             currentUserName={user.name}
             {...props}
           />
  })

  return (
    <Router history={browserHistory}>
      <Route path='/' >
      <IndexRoute component={HomeContainerWrapper} />
        <Route path='/home' component={HomeContainerWrapper} />
        <Route path='/providers/new' component={ProvidersFormAndIndexContainerWrapper} />
        <Route path='/prescriptions/new' component={PrescriptionsFormAndIndexContainerWrapper} />
        <Route path='/appointments/new' component={AppointmentsFormAndIndexContainerWrapper} />
        <Route path='/wellness_checks/new' component={WellnessContainerWrapper} />
      </Route>
    </Router>
  )
}

export default App;
