import React, { Component } from 'react'
import SummonerSearch from './components/SummonerSearch'
import SummonerHistory from './components/SummonerHistory'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <h1 className='app__title'>
          SUMMONER SEARCH
        </h1>

        <div className='app__content'>
          <SummonerSearch
            placeholder='summmoner name'
          />

          <SummonerHistory />
        </div>
      </div>
    )
  }
}

export default App
