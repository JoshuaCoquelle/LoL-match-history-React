import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    currentSummoner: '',
    summonerInput: ''
  }

  clickTest () {
    console.log('>>>')
  }

  render () {
    return (
      <div >
        <div>
          <h2>{this.state.msg}</h2>
          <button onClick={this.clickTest}>foo</button>
        </div>
      </div>
    )
  }
}

export default App
