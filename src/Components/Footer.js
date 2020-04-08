import React from "react"
import Grid from "@material-ui/core/Grid"
import Icon from "@material-ui/core/Icon"
import Instagram from "../Assets/instagram.svg"
import Facebook from "../Assets/facebook.svg"
import Line from "../Assets/line.svg"
import Twitter from "../Assets/twitter.svg"
import LinkedIn from "../Assets/linkedin.svg"

function Footer() {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container item justify="flex-end" align="center" xs={6}>
        <a
          href="https://www.instagram.com/isfnr/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Icon>
            <img src={Instagram} alt="Instagram" height="20" width="20" />
          </Icon>
        </a>
        &nbsp;
        <a
          href="https://www.instagram.com/isfnr/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Icon>
            <img src={Facebook} alt="Facebook" height="20" width="20" />
          </Icon>
        </a>
        &nbsp;
        <a
          href="https://www.instagram.com/isfnr/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Icon>
            <img src={Line} alt="Line" height="20" width="20" />
          </Icon>
        </a>
        &nbsp;
        <a
          href="https://www.instagram.com/isfnr/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Icon>
            <img src={Twitter} alt="Twitter" height="20" width="20" />
          </Icon>
        </a>
        &nbsp;
        <a
          href="https://www.instagram.com/isfnr/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Icon>
            <img src={LinkedIn} alt="LinkedIn" height="20" width="20" />
          </Icon>
        </a>
        &nbsp;
      </Grid>
      <Grid container item xs={6} justify="flex-start" align="center">
        &copy; 2020 Tanam
      </Grid>
    </Grid>
  )
}

export default Footer
