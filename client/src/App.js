import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Join, MachineContainer } from './components'

const App = () => (
    <Router>
        <Route path='/' exact component={Join} />
        <Route path='/biscuits_maker' component={MachineContainer} />
    </Router>
)

export default App