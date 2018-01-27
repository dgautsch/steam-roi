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
        <div className='col s-12 steam-roi-home'> {!this.isUser &&
          <div className='steam-roi-login'>
            <h2>Welcome!</h2>
            <p>This app helps you find out how much value you've gotten out of your games. You <strong>do not</strong> have to login to lookup your games. If you know your steam ID you can search for it on the search page. If you login we can do it for you. </p>
            <p>This app is only a proof of concept and only returns the first 15 results of the games you own. If you have not played any of those first 15 games, they will not show up.</p>
            <p>Everyday I'm trying to make this app better! Contact me at dan(at)gautsch(.)codes!</p>
            <a className='waves-effect waves-light btn-large' href='auth/steam'>Sign On with Steam</a>
          </div>
        } {this.isUser &&
          <div className='col s-12 steam-roi-loggedin'>
            <h2>Hello, {this.props.user.displayName}.</h2>
            <p>Now that you're logged in go over to the <a href='/account'>account page</a> and get your steam ID. Or you can click the results button to see the value of your games</p>
            <p><a className='waves-effect waves-light btn-large' href={'/search?id=' + this.props.user.id}>Get your results!</a></p>
            <hr />
            <a className='waves-effect waves-light btn red lighten-1' href='logout'>Logout</a>
          </div>
        }
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = Home
