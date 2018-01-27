const React = require('react')
const Navbar = require('../components/navbar')
 
class DefaultLayout extends React.Component {
  constructor (props) {
    super(props)
    this.navigation = props.navigation
    this.isLoggedIn = props.isUser
  }
  render () {
    return (
      <html lang='en'>

        <head>
          <meta charset='UTF-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <title>{this.props.title}</title>
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css' />
          <link rel='stylesheet' href='/styles/styles.css' />
        </head>

        <body>
          <div className='container'>
            <Navbar isLoggedIn={this.isLoggedIn} />
            {this.props.children}
          </div>
          <script src='https://code.jquery.com/jquery-3.3.1.min.js' />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js' />
          <script src='/scripts/main.js' />
        </body>
      </html>
    )
  }
}
 
module.exports = DefaultLayout
