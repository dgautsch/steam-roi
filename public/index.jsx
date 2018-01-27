const React = require('react')
const DefaultLayout = require('./layouts/default')

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.isUser = this.props.user
  }
  render () {
    return (
      <DefaultLayout title={this.props.title} loggedIn={this.isUser}>
        <div className='steam-roi-home'> {!this.isUser &&
          <div className='steam-roi-login'>
            <h2>Welcome! Please log in.</h2>
            <a href='auth/steam'>Sign On with Steam</a>
          </div>
        } {this.isUser &&
          <div className='steam-roi-loggedin'>
            <h2>Hello, {this.props.user.displayName}.</h2>
            <p>Now that you're logged in go over to the <a href='/account'>account page</a> and get your steam ID. Or you can click the results button to see the value of your games</p>
            <a className='waves-effect waves-light btn-large' href={'/search?id=' + this.props.user.id}>Get your results!</a>
          </div>
        }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Home
