import React from "react"
import { Link, withRouter } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import PropTypes from "prop-types"
import Logo from "../logo.png"
import LogoFull from "../logo-full.png"
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function HeaderComponent(props) {
  const { path } = props
  return (
    <div style={{ flexGrow: 1 }}>
      <ElevationScroll {...props}>
      <AppBar position="fixed" color="white">
        {path !== "/" ? (
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              to="/"
              aria-label="menu"
              style={{ spacing: 2 }}
            >
              <img src={Logo} alt="Logo" width="48" height="48" />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#41d76c" }}>
              Tanam
            </Typography>
            <Button
              component={Link}
              to="/monitoring"
              color="inherit"
              variant={path === "/monitoring" ? "outlined" : "text"}
              style={{ color: "#41d76c", textTransform: "none" }}
            >
              Monitoring
            </Button>
            <Button
              component={Link}
              to="/prediction"
              color="inherit"
              variant={path === "/prediction" ? "outlined" : "text"}
              style={{ color: "#41d76c", textTransform: "none" }}
            >
              Prediction
            </Button>
            <Button
              component={Link}
              to="/recommendation"
              color="inherit"
              variant={path === "/recommendation" ? "outlined" : "text"}
              style={{ color: "#41d76c", textTransform: "none" }}
            >
              Recommendation
            </Button>
            <Button
              component={Link}
              to="/account"
              color="inherit"
              variant={path === "/account" ? "outlined" : "text"}
              style={{ color: "#41d76c", textTransform: "none" }}
            >
              Account
            </Button>
            <Button
              component={Link}
              to="/logout"
              color="inherit"
              variant={path === "/logout" ? "outlined" : "text"}
              style={{ color: "#41d76c", textTransform: "none" }}
            >
              Logout
            </Button>
           </Toolbar>
           ) : (
           <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ spacing: 2 }}
            >
              <img src={Logo} alt="Logo" width="48" height="48" />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#4da708" }}>
              Tanam
            </Typography>
            <Button
              component={Link}
              to="/"
              color="inherit"
              variant={path === "/" ? "outlined" : "text"}
              style={{ color: "#41d76c", textTransform: "none" }}
            >
              Login
            </Button>
           </Toolbar>
         )}
      </AppBar>
      </ElevationScroll>
    </div>
  )
}

const Header = withRouter(props => (
  <HeaderComponent path={props.location.pathname} />
))

HeaderComponent.propTypes = {
  path: PropTypes.string
}

HeaderComponent.defaultProps = {
  path: null
}

export default Header
