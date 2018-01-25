const React = require('react')
const DefaultLayout = require('./layouts/default')

class HomeScreen extends React.Component {
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
            <p><a href='account'>See Account Information</a></p>
          </div>
        }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = HomeScreen
