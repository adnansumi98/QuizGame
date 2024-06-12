import { withRouter } from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Header = (props) => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const { history } = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <img
        src="../../../static/images/Logo.png"
        alt="Logo"
        className="header-logo"
      />
      <button className="header-button" onClick={onClickLogout}>
        <img
          src="../../../static/images/log-out.png"
          alt="Logout"
          className="logout-icon"
        />
        <p className="logout-text">Logout</p>
      </button>
    </nav>
  )
}

export default withRouter(Header)

// Header Completed needs testing
