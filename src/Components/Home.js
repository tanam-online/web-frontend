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
import HomeMain from "../Assets/home-main.jpg"
import Dashboard from "../Assets/dashboard.svg"
import Prediction from "../Assets/prediction.svg"
import Like from "../Assets/like.svg"

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
        <Grid container spacing={10} justify="center" alignItems="center">
          <Grid container item justify="flex-end" xs={12} md={4}>
            <img src={HomeMain} alt="Smart Farming" width="256" height="256" />
          </Grid>
          <Grid container item justify="flex-start" xs={12} md={8}>
            <Grid item xs={12}>
              <h1 style={{ color: "green" }}>Tanam</h1>
            </Grid>
            <Grid item xs={12}>
              <h3>Smart Monitoring and Precision Agriculture</h3>
            </Grid>
            <Grid item xs={12}>
              <p>
                Tanam adalah sebuah layanan pertanian modern dan digital. Tanam
                bertujuan untuk membantu para petani dan pemilik lahan di
                seluruh Indonesia untuk meningkatkan efisiensi dan produktivitas
                dalam bertani dengan memanfaatkan teknologi saat ini seperti
                Internet of Things dan Machine Learning. Tanam memiliki 3
                keunggulan utama, yaitu monitoring lahan dan tanaman secara
                real-time, prediksi keadaan lahan dan tanaman ke depan, serta
                rekomendasi langkah terbaik untuk bercocok tanam.
              </p>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={Link}
                color="inherit"
                variant="outlined"
                to="/login"
                style={{ color: "green", textTransform: "none" }}
              >
                Coba Sekarang
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        justify="center"
        xs={12}
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Typography variant="h4">Features</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid container item justify="center" xs={12} md={4}>
            <Card className={classes.root} elevation={3}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Dashboard}
                  title="Feature 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Real-time Monitoring
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Tanam menawarkan layanan dashboard untuk memantau lahan dan
                    tanaman secara real-time dengan memanfaatkan sensor IoT
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid container item justify="center" xs={12} md={4}>
            <Card className={classes.root} elevation={3}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Prediction}
                  title="Feature 2"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Prediction
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Tanam menawarkan layanan laporan prediksi keadaan lahan ke
                    depan dengan memanfaatkan Machine Learning
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid container item justify="center" xs={12} md={4}>
            <Card className={classes.root} elevation={3}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Like}
                  title="Feature 3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Recommendation
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Tanam menawarkan layanan rekomendasi langkah terbaik dalam
                    bercocok tanam dengan memanfaatkan Machine Learning
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
