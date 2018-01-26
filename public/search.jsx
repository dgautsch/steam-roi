const React = require('react')
const DefaultLayout = require('./layouts/default')

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.data = props.data
  }
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        {this.props.error &&
          <div className='card-panel red lighten-3'>That user ID is invalid.</div>
        }
        <div className='row'>
          <div className='col s12'>
            <h3>Search for a user</h3>
            <p>Use a steam id to find what games a user plays, how much they cost, and what their value per dollar is. You can find a user's steam <a href='https://steamidfinder.com/'>ID here.</a></p>
            <p>If you don't know a user to look up, here is a sample ID: 76561198028619700</p>
          </div>
          <div className='col s12'>
            <div className='input-field'>
              <form role='search' method='get' className='form' action='/search'>
                <input id='search' type='search' className='validate' name='id' />
                <label for='search' className='active'>Search</label>
                <button type='submit' className='waves-effect waves-light btn'>Search</button>
              </form>
            </div>
          </div>
          {this.data &&
          <div className='col s12'>
            <ul>
              {this.data.map((item, idx) => (
                <li className='results' key={idx}>
                  <p>{item.name}</p>
                  <p>{item.price_overview.final.toLocaleString('en-US')}</p>
                  <img src={item.header_image} />
                  <hr />
                </li>
              ))
              }
            </ul>
          </div>
          }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Search
