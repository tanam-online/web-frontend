import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"
import { Line } from "react-chartjs-2"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import { useCookies } from "react-cookie"
import Swal from "sweetalert2"
import axios from "axios"
import API from "../config"

const useStyles = makeStyles(theme => ({
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
  },
  formControl: {
    minWidth: 1200,
    fullWidth: true
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  input: {
    color: "green"
  }
}))

function Monitoring() {
  const [userCookies] = useCookies(["userCookie"])
  const [lands, setLands] = React.useState([])
  const [loadingSelect, setLoadingSelect] = React.useState(true)
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [land, setLand] = React.useState("")
  const [average, setAverage] = React.useState({
    suhu: "Loading...",
    kelembaban: "Loading...",
    cahaya: "Loading...",
    angin: "Loading...",
    cuaca: "Loading..."
  })
  const [sensorData, setSensorData] = React.useState({
    suhu: [],
    kelembaban: [],
    cahaya: [],
    angin: [],
    waktu: []
  })

  const handleChangeLand = event => {
    setLand(lands[event.target.value])
  }

  const handlePreChangeLand = event => {
    event.preventDefault()
    setLand(null)
  }

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  const handleDownload = event => {
    event.preventDefault()
    window.open(`${API.report}/download/${land.id}`, "_blank")
  }

  React.useEffect(() => {
    const createDate = () => {
      const date = `0${selectedDate.getDate()}`.slice(-2)
      const month = `0${selectedDate.getMonth() + 1}`.slice(-2)
      const year = selectedDate.getFullYear()
      return `${date}-${month}-${year}`
    }

    async function fetchDataRealTimeByLand(date) {
      await axios
        .get(`${API.dashboard}/real-time/${land.id}/${date}`)
        .then(response => {
          console.log(response)
          if (response.data.data) {
            setAverage(response.data.data.average)
            response.data.data.sensor_data.forEach(item => {
              setSensorData(prev => ({
                suhu: [...prev.suhu, item.suhu],
                kelembaban: [...prev.kelembaban, item.kelembaban],
                cahaya: [...prev.cahaya, item.cahaya],
                angin: [...prev.angin, item.angin],
                waktu: [
                  ...prev.waktu,
                  new Date(item.waktu).toLocaleTimeString()
                ]
              }))
            })
          }
        })
        .catch(error => {
          setAverage({
            suhu: "Belum ada input data",
            kelembaban: "Belum ada input data",
            cahaya: "Belum ada input data",
            angin: "Belum ada input data",
            cuaca: "Belum ada input data"
          })
          console.log(error.response)
        })
    }
    if (land) {
      setAverage({
        suhu: "Loading...",
        kelembaban: "Loading...",
        cahaya: "Loading...",
        angin: "Loading...",
        cuaca: "Loading..."
      })
      setSensorData({
        suhu: [],
        kelembaban: [],
        cahaya: [],
        angin: [],
        waktu: []
      })
      fetchDataRealTimeByLand(createDate())
    }
  }, [land, selectedDate])

  React.useEffect(() => {
    async function fetchDataLandsByUser() {
      await axios
        .get(`${API.land}/lands/by-user/${userCookies.id}`)
        .then(response => {
          if (response.data.data && response.data.data.length > 0) {
            setLoadingSelect(false)
            setLands(response.data.data)
          } else {
            console.log("no data")
            setLoadingSelect(false)
            Swal.fire("Gagal!", "Anda belum mendaftarkan lahan", "error")
          }
        })
        .catch(error => {
          console.log(error.response)
          // Swal.fire("Gagal!", error, "error")
        })
    }
    fetchDataLandsByUser()
  }, [userCookies.id])

  const classes = useStyles()
  // Ambil 10 (kalau data >= 10)
  // ex label -> convert(timestamp) to date
  // ex 100 -> floor(100/3), floor(100/3*2), floor(100/3*3)
  const dataSuhu = {
    labels: sensorData.waktu,
    datasets: [
      {
        label: "Suhu (C)",
        data: sensorData.suhu,
        backgroundColor: "#71F79F"
      }
    ]
  }
  const dataKelembaban = {
    labels: sensorData.waktu,
    datasets: [
      {
        label: "Kelembaban (%)",
        data: sensorData.kelembaban,
        backgroundColor: "#3DD6D0"
      }
    ]
  }
  const dataCahaya = {
    labels: sensorData.waktu,
    datasets: [
      {
        label: "Cahaya (Cd/m2)",
        data: sensorData.cahaya,
        backgroundColor: "#15B097"
      }
    ]
  }
  const dataAngin = {
    labels: sensorData.waktu,
    datasets: [
      {
        label: "Angin (m/s)",
        data: sensorData.angin,
        backgroundColor: "#A8C9C9"
      }
    ]
  }
  return (
    <Grid container justify="center">
      {land ? (
        <Grid container spacing={3} justify="center">
          <Grid container spacing={3} alignItems="center" item xs={12}>
            <Grid item xs={12} md={4}>
              <h1 style={{ color: "green" }}>Dashboard Monitoring</h1>
              <h3 style={{ color: "#41d76c" }}>
                {land.nama}, sejak {selectedDate.toDateString()}
              </h3>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                color="inherit"
                variant="outlined"
                fullWidth
                style={{ color: "green", textTransform: "none" }}
                onClick={handleDownload}
              >
                Unduh Laporan
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                color="inherit"
                variant="outlined"
                fullWidth
                onClick={handlePreChangeLand}
                style={{ color: "green", textTransform: "none" }}
              >
                Pilih Lahan
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Pilih Waktu"
                  format="dd/MM/yyyy"
                  inputVariant="outlined"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  InputProps={{ className: classes.input }}
                  disableFuture
                />
              </MuiPickersUtilsProvider>
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
                    <span style={{ color: "#41d76c" }}>{average.cuaca}</span>
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
                    Suhu:{" "}
                    <span style={{ color: "#41d76c" }}>
                      {average.suhu.replace(".", ",")} &deg;C
                    </span>
                    <br />
                    Kelembaban:{" "}
                    <span style={{ color: "#41d76c" }}>
                      {average.kelembaban.replace(".", ",")}%
                    </span>
                    <br />
                    Cahaya:{" "}
                    <span style={{ color: "#41d76c" }}>
                      {average.cahaya.replace(".", ",")} Cd/m2
                    </span>
                    <br />
                    Angin:{" "}
                    <span style={{ color: "#41d76c" }}>
                      {average.angin.replace(".", ",")} m/s
                    </span>
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
                    Sensor kelembaban:{" "}
                    <span style={{ color: "#41d76c" }}>Aktif</span>
                    <br />
                    Sensor cahaya:{" "}
                    <span style={{ color: "#41d76c" }}>Aktif</span>
                    <br />
                    Sensor angin:{" "}
                    <span style={{ color: "#41d76c" }}>Aktif</span>
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid container spacing={3} item xs={12} md={9}>
              <Grid item xs={12} md={6}>
                <Card className={classes.root} elevation={3}>
                  <CardContent>
                    <Line
                      data={dataSuhu}
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
                    <Line
                      data={dataCahaya}
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
                    <Line
                      data={dataAngin}
                      width={100}
                      height={50}
                      options={{}}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} justify="center">
          <Grid container spacing={3} alignItems="center" item xs={12}>
            <Grid item xs={12} md={4}>
              <h1 style={{ color: "green" }}>Dashboard Monitoring</h1>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} md={12}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  disabled={loadingSelect}
                >
                  <InputLabel id="land-select-label">
                    {loadingSelect ? "Mohon tunggu sebentar..." : "Pilih Lahan"}
                  </InputLabel>
                  <Select
                    labelId="land-select-label"
                    value={land}
                    onChange={handleChangeLand}
                  >
                    <MenuItem value="" disabled>
                      Pilih Lahan
                    </MenuItem>
                    {lands.map((oneLand, index) => {
                      return (
                        <MenuItem key={oneLand.id} value={index}>
                          {oneLand.nama}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Monitoring
