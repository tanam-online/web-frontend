import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import { Line } from "react-chartjs-2"

const useStyles = makeStyles({
  root: {
    minWidth: "100%"
    // minHeight: '100%'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

function Monitoring() {
  const classes = useStyles()
  const dataSuhu = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Suhu",
        data: [86, 67, 91, 24, 24, 65],
        backgroundColor: "#71F79F"
      }
    ]
  }
  const dataKelembaban = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Kelembaban",
        data: [86, 67, 91, 54, 12, 43],
        backgroundColor: "#3DD6D0"
      }
    ]
  }
  const dataCahaya = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Cahaya",
        data: [86, 67, 91, 54, 54, 78],
        backgroundColor: "#15B097"
      }
    ]
  }
  const dataAngin = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Angin",
        data: [86, 67, 91, 54, 65, 23],
        backgroundColor: "#A8C9C9"
      }
    ]
  }
  return (
    <Grid container spacing={3} justify="center">
      <Grid container spacing={3} alignItems="center" item xs={12}>
        <Grid item xs={12} md={4}>
          <h1 style={{ color: "green" }}>Dashboard Monitoring</h1>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color="inherit"
            variant="outlined"
            fullWidth
            style={{ color: "green", textTransform: "none" }}
          >
            Unduh Laporan
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color="inherit"
            variant="outlined"
            fullWidth
            style={{ color: "green", textTransform: "none" }}
          >
            Pilih Lahan
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color="inherit"
            variant="outlined"
            fullWidth
            style={{ color: "green", textTransform: "none" }}
          >
            Waktu Mulai
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            color="inherit"
            variant="outlined"
            fullWidth
            style={{ color: "green", textTransform: "none" }}
          >
            Waktu Selesai
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} item xs={12}>
        <Grid item xs={12} md={3}>
          <Card className={classes.root} elevation={3}>
            <CardContent>
              <Typography
                className={classes.pos}
                variant="body2"
                component="p"
                color="textSecondary"
              >
                Cuaca
              </Typography>
              <Typography
                className={classes.pos}
                variant="subtitle1"
                component="h2"
              >
                <span style={{ color: "#41d76c" }}>Cerah</span>
              </Typography>
              <hr />
              <Typography
                className={classes.pos}
                variant="body2"
                component="p"
                color="textSecondary"
              >
                Rata-rata Tiap Komponen
              </Typography>
              <Typography
                className={classes.pos}
                variant="subtitle1"
                component="h2"
              >
                Suhu: <span style={{ color: "#41d76c" }}>10 &deg;C</span>
                <br />
                Kelembaban: <span style={{ color: "#41d76c" }}>43%</span>
                <br />
                Cahaya: <span style={{ color: "#41d76c" }}>33 Cd</span>
                <br />
                Angin: <span style={{ color: "#41d76c" }}>2.54 m/s</span>
                <br />
              </Typography>
              <hr />
              <Typography
                className={classes.pos}
                variant="body2"
                component="p"
                color="textSecondary"
              >
                Status Sensor
              </Typography>
              <Typography className={classes.pos} variant="subtitle1">
                Sensor suhu: <span style={{ color: "#41d76c" }}>Aktif</span>
                <br />
                Sensor kelembaban: <span style={{ color: "#41d76c" }}>Aktif</span>
                <br />
                Sensor cahaya: <span style={{ color: "#41d76c" }}>Aktif</span>
                <br />
                Sensor angin: <span style={{ color: "#41d76c" }}>Aktif</span>
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={3} item xs={12} md={9}>
          <Grid item xs={12} md={6}>
            <Card className={classes.root} elevation={3}>
              <CardContent>
                <Line data={dataSuhu} width={100} height={50} options={{}} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className={classes.root} elevation={3}>
              <CardContent>
                <Line
                  data={dataKelembaban}
                  width={100}
                  height={50}
                  options={{}}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className={classes.root} elevation={3}>
              <CardContent>
                <Line data={dataCahaya} width={100} height={50} options={{}} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className={classes.root} elevation={3}>
              <CardContent>
                <Line data={dataAngin} width={100} height={50} options={{}} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Monitoring
