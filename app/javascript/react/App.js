import React from 'react'
import HomeContainer from './containers/HomeContainer'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

const App = (props) => {
  let userComponent = ((props) => {
    let user = JSON.parse(document.getElementById('app').dataset.currentUser)
    return <HomeContainer
             currentUserId={user.id}
             currentUserName={user.name}
             {...props}
           />
  })
  return (
    <Router history={browserHistory}>
      <Route path='/' >
      <IndexRoute component={userComponent} />
        <Route path='/home' component={userComponent} />
      </Route>
    </Router>
  )
}

export default App;
