import axios from 'axios'
import React, { Component } from 'react'
import SummonerSearch from './components/SummonerSearch'
import SummonerHistory from './components/SummonerHistory'
import './App.css'

class App extends Component {
  state = {
    accountName: '',
    latestMatches: []
  }

  async handleSearch (accountName) {
    if (!accountName) return

    try {
      const { data } = await axios.get(`http://localhost:3001/api/summoner/${accountName}`)

      this.setState({
        accountName,
        latestMatches: data.payload
      })
    } catch (err) {
      console.warn(err)
    }
  }

  render () {
    return (
      <main className='app'>
        <header className='app__title'>
          LF> Summoner LoL
        </header>

        <section className='app__content'>
          <SummonerSearch
            handleSearch={this.handleSearch.bind(this)}
            placeholder='summmoner name'
          />

          <SummonerHistory
            accountName={this.state.accountName}
            latestMatches={this.state.latestMatches}
          />
        </section>
      </main>
    )
  }
}

export default App
