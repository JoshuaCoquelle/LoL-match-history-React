import React from 'react'
import './index.css'

const SummonerCard = (props) => {
  return (
    <article className='card'>
      <section className='card__header'>
        <p className='card__header__title'>
          NAME
        </p>

        <div className='card__header__status'>
          <p>VICTORY</p>
        </div>
      </section>

      <section className='card__body'>
        <p className='card__body__account'>
          BFY MEOWINGTON
        </p>

        <div className='card__body__stats'>
          <div className='card__body__stats__KDA'>
            <p>K / D/ A </p>
            <strong>13 - 24 - 2</strong>
          </div>

          <div className='card__body__stats__CS'>
            <p>Creep Score</p>
            <strong>245 / 6.8m</strong>
          </div>

          <div className='card__body__stats__duration'>
            <p>Duration</p>
            <strong>1hr 20m</strong>
          </div>
        </div>
      </section>

      <section className='card__footer'>
        <div className='card__footer__runes'>
          <p>Runes</p>
          <ul>
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ul>
        </div>

        <div className='card__footer__items'>
          <p>Items</p>
          <ul>
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ul>
        </div>
      </section>
    </article>
  )
}

export default SummonerCard
