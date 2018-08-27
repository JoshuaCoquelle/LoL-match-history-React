import React from 'react'
import './index.css'

const SummonerSearch = (props) => {
  return (
    <div className='summoner-search'>
      <input
        className='summoner-search__input'
        placeholder={props.placeholder}
        onChange={props.handleInput}
      />

      <button className='summoner-search__btn'>
        GO
      </button>
    </div>
  )
}

export default SummonerSearch
