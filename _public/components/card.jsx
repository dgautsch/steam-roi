const React = require('react')

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.game = props.data
  }

  minutesToHours (mins) {
    let hours = parseInt(mins / 60)
    let minutes = mins % 60
    return `${hours} hours ${minutes} minutes`
  }

  pricePerHour (cost, playtime) {
    if (playtime === 0) {
      return 'Unplayed, no value yet.'
    }
    if (playtime < 60) {
      return cost / 100
    }
    return (parseInt(cost) / 100 / (parseInt(playtime) / 60)).toFixed(2)
  }

  priceIsDefined () {
    return this.game.price_overview !== undefined
  }

  render () {
    return (
      <div className='card hoverable'>
        <div className='card-image'>
          <img src={this.game.header_image} />
          <span className='card-title'>{this.game.data}</span>
        </div>
        <div className='card-content black-text'>
          <p>Playtime: {this.minutesToHours(this.game.playTime)} </p>
          <p>
            Cost:{' '}
            {this.priceIsDefined()
              ? '$' + (this.game.price_overview.initial / 100).toFixed(2)
              : 'No Price Defined'}
          </p>
          <p>
            Entertainment Cost Per Hour:{' '}
            {this.priceIsDefined()
              ? '$' +
                this.pricePerHour(
                  this.game.price_overview.initial,
                  this.game.playTime
                )
              : 'No Price Defined'}
          </p>
        </div>
        <div className='card-action'>
          <a href={this.game.website}>Visit Game Site</a>
        </div>
      </div>
    )
  }
}

module.exports = Card
