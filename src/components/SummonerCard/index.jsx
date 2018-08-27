import React from 'react'
import './index.css'

const SummonerCard = (props) => {
  return (
    <div className='summoner-card'>
      <div className='summoner-card__header'>
        <p className='summoner-card__header__title'>
          NAME
        </p>

        <div className='summoner-card__header__status'>
          <p>VICTORY</p>
        </div>
      </div>

      <div className='summoner-card__body'>
        <p className='summoner-card__body__account'>
          BFY MEOWINGTON
        </p>
      </div>

      <div className='summoner-card__footer'>
        footer items
      </div>
    </div>
  )
}

export default SummonerCard
