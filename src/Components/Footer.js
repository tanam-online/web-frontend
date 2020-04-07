import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { makeStyles } from "@material-ui/core/styles"
import Icon from '@material-ui/core/Icon';
import Instagram from "../Assets/instagram.svg"
import Facebook from "../Assets/facebook.svg"
import Line from "../Assets/line.svg"
import Twitter from "../Assets/twitter.svg"
import LinkedIn from "../Assets/linkedin.svg"

function Footer() {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container item justify="flex-end" align="center" xs={6}>
        <a href="#" style={{ textDecoration: "none" }}><Icon>
          <img src={Instagram} alt="Instagram" height="20" width="20" />
        </Icon></a>
        &nbsp;
        <a href="#" style={{ textDecoration: "none" }}><Icon>
          <img src={Facebook} alt="Facebook" height="20" width="20" />
        </Icon></a>
        &nbsp;
        <a href="#" style={{ textDecoration: "none" }}><Icon>
          <img src={Line} alt="Line" height="20" width="20" />
        </Icon></a>
        &nbsp;
        <a href="#" style={{ textDecoration: "none" }}><Icon>
          <img src={Twitter} alt="Twitter" height="20" width="20" />
        </Icon></a>
        &nbsp;
        <a href="#" style={{ textDecoration: "none" }}><Icon>
          <img src={LinkedIn} alt="LinkedIn" height="20" width="20" />
        </Icon></a>
        &nbsp;
      </Grid>
      <Grid container item xs={6} justify="flex-start" align="center">
        &copy; 2020 Tanam
      </Grid>
    </Grid>
  )
}

export default Footer
