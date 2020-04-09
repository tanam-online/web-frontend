import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MUILink from "@material-ui/core/Link"
import NotFoundImage from "../Assets/not-found.jpg"

function NotFound() {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Grid container item xs={12} justify="center" alignItems="center">
          <img src={NotFoundImage} alt="Not Found" contain width="100%" />
          <h5>
            Waduh, nyasar tong! 
            Kalem, mangga balik ke&nbsp;
            <MUILink  component={Link} style={{ color: "green" }} to="/">
              Homepage
            </MUILink>
          </h5>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NotFound
