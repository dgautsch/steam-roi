const React = require('react')

class NavBar extends React.Component {
  render () {
    return (
      <div className='row'>
        <nav className='grey darken-4'>
          <div className='nav-wrapper'>
            <a href='/' className='brand-logo hide-on-med-and-down'><i className='material-icons'>gamepad</i>Steam ROI</a>
            <a href='/' data-activates='mobile-demo' className='button-collapse'><i className='material-icons'>menu</i></a>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              <li><a href='/'>Home</a></li>
              <li><a href='/account'>Account</a></li>
              <li><a href='/search'>Search</a></li>
            </ul>

            <ul className='side-nav' id='mobile-demo'>
              <li><a href='/'>Home</a></li>
              <li><a href='/account'>Account</a></li>
              <li><a href='/search'>Search</a></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = NavBar
