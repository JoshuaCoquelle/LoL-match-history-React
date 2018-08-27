import React from 'react'
import SummonerCard from '../SummonerCard/index'
import './index.css'

const renderMatchCards = ({ accountName, latestMatches }) => {
  const cards = latestMatches.map((card, $i) => {
    return (
      <SummonerCard
        key={$i}
        accountName={accountName}
        {...card}
      />
    )
  })

  if (cards.length) {
    return (
      <div>
        <p className='history__latest-msg'>
          showing latest {cards.length} matches
        </p>

        {cards}
      </div>
    )
  }

  return <p className='history__latest-msg'>No match history available</p>
}

const SummonerHistory = (props) => {
  return (
    <div className='history'>
      {renderMatchCards(props)}
    </div>
  )
}

export default SummonerHistory
