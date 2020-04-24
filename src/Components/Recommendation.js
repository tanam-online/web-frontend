import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import { useCookies } from "react-cookie"
import Swal from "sweetalert2"
import axios from "axios"
import Logo from "../Assets/logo.png"
import API from "../config"

const useStyles = makeStyles({
  formControl: {
    minWidth: 1200,
    fullWidth: true
  }
})

function Recommendation() {
  const [userCookies] = useCookies(["userCookie"])
  const [lands, setLands] = React.useState([])
  const [loadingSelect, setLoadingSelect] = React.useState(true)
  const [land, setLand] = React.useState("")
  const [data, setData] = React.useState([])

  const handleChangeLand = event => {
    setLand(lands[event.target.value])
  }

  const handlePreChangeLand = event => {
    event.preventDefault()
    setLand(null)
  }

  React.useEffect(() => {
    async function fetchDataRecommendationByLand() {
      await axios
        .get(`${API.dashboard}/recommendation/${land.id}`)
        .then(response => {
          console.log(response)
          if (response.data.data) {
            setData(response.data.data)
          }
        })
        .catch(error => {
          setData(["Tidak ada rekomendasi"])
          console.log(error.response)
        })
    }
    if (land) {
      setData(["Loading..."])
      fetchDataRecommendationByLand()
    }
  }, [land])

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

  return (
    <Grid container justify="center">
      {land ? (
        <Grid container spacing={3} justify="center">
          <Grid container spacing={3} alignItems="center" item xs={12}>
            <Grid item xs={12} md={9}>
              <h1 style={{ color: "green" }}>Rekomendasi Langkah Terbaik</h1>
              <h3 style={{ color: "#41d76c" }}>{land.nama}</h3>
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
          </Grid>
          <Grid container spacing={3} item xs={12}>
            <List component="nav" aria-label="main mailbox folders">
              {data.map(item => (
                <ListItem button>
                  <ListItemIcon>
                    <img src={Logo} alt="Logo" width="36" height="36" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.replace(".", ",")}
                    style={{ color: "green" }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} justify="center">
          <Grid container spacing={3} alignItems="center" item xs={12}>
            <Grid item xs={12}>
              <h1 style={{ color: "green" }}>Rekomendasi Langkah Terbaik</h1>
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

export default Recommendation
