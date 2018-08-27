import React from 'react'
import './index.css'

const SummonerSearch = (props) => {
  return (
    <div className='search'>
      <input
        className='search__input'
        placeholder={props.placeholder}
        onChange={props.handleInput}
      />

      <button className='search__btn'>
        GO
      </button>
    </div>
  )
}

export default SummonerSearch
