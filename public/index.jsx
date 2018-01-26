const React = require('react')
const DefaultLayout = require('./layouts/default')

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.isUser = this.props.user
  }
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <div className='steam-roi-home'> {!this.isUser &&
          <div className='steam-roi-login'>
            <h2>Welcome! Please log in.</h2>
            <a href='auth/steam'>Sign On with Steam</a>
          </div>
        } {this.isUser &&
          <div className='steam-roi-loggedin'>
            <h2>Hello, {this.props.user.displayName}. - <a href='logout'>Logout</a></h2>
            <ul>
              <li><a href='account'>See Account Information</a></li>
              <li><a href='/api/v1/user/games'>See User Games API (Only the first 5 games)</a></li>
              <li><a href='/api/v1/user'>See User Details API</a></li>
            </ul>
          </div>
        }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Home
