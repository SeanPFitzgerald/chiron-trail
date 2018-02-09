import React from 'react'
import HomeContainer from './containers/HomeContainer'
import TreatmentsFormsContainer from './containers/TreatmentsFormsContainer'
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

  let TreatmentsContainerWrapper = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <TreatmentsFormsContainer
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
        <Route path='/treatments/new' component={TreatmentsContainerWrapper} />
      </Route>
    </Router>
  )
}

export default App;
