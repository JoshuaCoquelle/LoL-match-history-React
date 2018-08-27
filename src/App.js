import React, { Component } from 'react'
import SummonerSearch from './components/SummonerSearch'
import SummonerHistory from './components/SummonerHistory'
import './App.css'

class App extends Component {
  render () {
    return (
      <main className='app'>
        <header className='app__title'>
          SUMMONER SEARCH
        </header>

        <section className='app__content'>
          <SummonerSearch
            placeholder='summmoner name'
          />

          <SummonerHistory />
        </section>
      </main>
    )
  }
}

export default App
