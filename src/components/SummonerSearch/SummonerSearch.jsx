import React from 'react'

const SummonerSearch = (props) => {
  return (
    <div>
      <input onChange={props.handleInput} />
      <button>GO</button>
    </div>
  )
}

export default SummonerSearch
