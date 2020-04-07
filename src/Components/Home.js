import React from "react"
import { Redirect } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import API from "../config"
import Logo from "../Assets/logo.png"
import LogoFull from "../Assets/logo-full.png"

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

function Home() {
  const classes = useStyles()
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center">
          <Grid container item justify="flex-end" xs={12} md={4}>
            <img src={LogoFull} alt="Logo" width="256" height="256" />
          </Grid>
          <Grid container item justify="flex-start" xs={12} md={8}>
            <Typography color="inherit" variant="h6">
              Tanam
            </Typography>
            <br />
            <Typography color="inherit" variant="subtitle1">
              Smart Monitoring and Precision Agriculture
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              Arkavidia 6.0 adalah acara prestisius tahunan yang diselenggarakan
              oleh Himpunan Mahasiswa Informatika Institut Teknologi Bandung
              (HMIF ITB). Bertemakan &quot;Embracing Our Nation in Digital
              Transformation,&quot; Arkavidia hadir untuk menyelaraskan dan
              menyebarluaskan transformasi digital yang sedang kita hadapi.
              Dengan pengalaman lebih dari 6 tahun dan 2000 peserta, Arkavidia
              berkembang lebih jauh lagi untuk memajukan pemahaman teknologi
              Indonesia.
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              style={{ textTransform: "none" }}
            >
              Coba Sekarang
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item justify="center" xs={12}>
        <Typography color="inherit" variant="h6">
          Features
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid container item justify="center" xs={12} md={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Logo}
                  title="Feature 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Feature 1
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid container item justify="center" xs={12} md={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={LogoFull}
                  title="Feature 2"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Feature 2
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid container item justify="center" xs={12} md={4}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Logo}
                  title="Feature 3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Feature 3
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
