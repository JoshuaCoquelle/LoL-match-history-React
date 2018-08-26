import React, { Component } from 'react'
import SummonerSearch from './components/SummonerSearch/SummonerSearch'
import './App.css'

class App extends Component {
  render () {
    return (
      <div >
        <div>
          <SummonerSearch />
          {/* <SummonerHistory /> */}
        </div>
      </div>
    )
  }
}

export default App
