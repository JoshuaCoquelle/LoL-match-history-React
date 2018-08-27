import React from 'react'
import './index.css'

const SummonerSearch = (props) => {
  let value = ''

  const currentValue = (e) => {
    value = e.target.value.trim() || ''
  }

  return (
    <div className='search'>
      <input
        onInput={currentValue}
        className='search__input'
        placeholder={props.placeholder}
      />

      <button
        className='search__btn'
        onClick={() => props.handleSearch(value)}
      >
        GO
      </button>
    </div>
  )
}

export default SummonerSearch
