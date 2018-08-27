// Vendor
import axios from 'axios'
import React, { Component } from 'react'

// Comps
import SummonerSearch from './components/SummonerSearch'
import SummonerHistory from './components/SummonerHistory'

// Styles
import './App.css'

class App extends Component {
  state = {
    accountName: '',
    latestMatches: []
  }

  handleSearch = async (accountName) => {
    if (!accountName) return

    try {
      const { data } = await axios.get(`http://localhost:3001/api/summoner/${accountName}`)
      const latestMatches = data.payload

      this.setState({ accountName, latestMatches })
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
            placeholder='enter thy summmoner name, pleb'
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
