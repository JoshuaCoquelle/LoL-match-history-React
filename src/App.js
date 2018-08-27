import React, { Component } from 'react'
import axios from 'axios'
import SummonerSearch from './components/SummonerSearch'
import SummonerHistory from './components/SummonerHistory'
import './App.css'

class App extends Component {
  state = {
    matchHistory: [],
  }

  async handleSearch (value) {
    try {
      const response = await axios.get(`http://localhost:3001/api/summoner/${value}`)
      const { payload } = response.data

      this.setState({ matchHistory: payload })
    } catch (err) {
      console.warn(err)
    }
  }

  render () {
    return (
      <main className='app'>
        <header className='app__title'>
          SUMMONER SEARCH
        </header>

        <section className='app__content'>
          <SummonerSearch
            handleSearch={this.handleSearch.bind(this)}
            placeholder='summmoner name'
          />

          <SummonerHistory matches={[1,2,3]}/>
        </section>
      </main>
    )
  }
}

export default App
