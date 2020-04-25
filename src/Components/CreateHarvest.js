import React from "react"
import { Link } from "react-router-dom"
import MUILink from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import axios from "axios"
import Swal from "sweetalert2"
// import PropTypes from "prop-types"
import API from "../config"

export default function CreateHarvest(props) {
  const {
    match: { params }
  } = props

  const [state, setState] = React.useState({
    loading: false
  })

  const handleInputChange = e =>
    setState({
      ...state,
      [e.target.name]: e.target.value
    })

  const handleSubmit = async event => {
    event.preventDefault()
    setState({ ...state, loading: true })
    Swal.fire({
      title: "Buat data panen baru?",
      text: "Pastikan data sudah terisi dengan benar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Buat",
      cancelButtonText: "Batal"
    }).then(async result => {
      if (result.value) {
        const payload = {
          deskripsi: state.deskripsi,
          hasil: parseInt(state.hasil, 10),
          profit: parseInt(state.profit, 10),
          waktu: state.waktu
        }
        await axios
          .post(`${API.land}/harvests/${params.landId}`, payload)
          .then(() => {
            setState({ ...state, loading: false })
            Swal.fire("Tersimpan!", "Data panen berhasil dibuat.", "success")
          })
          .catch(error => {
            setState({ ...state, loading: false })
            Swal.fire("Gagal!", error, "error")
          })
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <MUILink component={Link} color="inherit" to="/manage">
                Manage
              </MUILink>
              <MUILink
                component={Link}
                color="inherit"
                to={`/land/${params.landId}`}
              >
                Land {params.landId}
              </MUILink>
              <Typography color="textPrimary">Create Harvest</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <h1 style={{ color: "green" }}>Buat Data Panen Baru</h1>
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              label="Deskripsi"
              name="deskripsi"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              label="Hasil (ton)"
              name="hasil"
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              label="Profit (Rp)"
              name="profit"
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              label="Waktu"
              name="waktu"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              style={{ color: "green", textTransform: "none" }}
              type="submit"
              disabled={state.loading}
            >
              {state.loading ? "Mohon tunggu..." : "Buat"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

// CreateHarvest.propTypes.shape({
//   match: PropTypes.object.isRequired
// })
