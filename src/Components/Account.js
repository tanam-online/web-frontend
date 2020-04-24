import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MUILink from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { useCookies } from "react-cookie"
import Swal from "sweetalert2"
import axios from "axios"
import API from "../config"

export default function Account() {
  const [userCookies] = useCookies(["userCookie"])
  const [state, setState] = React.useState({ loading: true })

  const handleChangeState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setState({ ...state, loading: true })
    if (state.email && state.nama && state.no_telepon) {
      const payload = {
        email: state.email,
        nama: state.nama,
        no_telepon: state.no_telepon,
        role: "customer"
      }
      Swal.fire({
        title: `Yakin?`,
        text: "Pastikan datamu sudah benar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal"
      }).then(async result => {
        if (result.value) {
          await axios
            .put(`${API.user}/users/${userCookies.id}`, payload)
            .then(response => {
              console.log(response)
              if (response.data.data && response.data.data.length > 0) {
                setState({ ...state, loading: false })
                Swal.fire("Berhasil!", "Data berhasil diubah", "success")
              } else {
                setState({ ...state, loading: false })
                Swal.fire("Gagal!", "Ada yang error nih", "error")
              }
            })
            .catch(error => {
              console.log(error)
              setState({ ...state, loading: false })
              Swal.fire("Gagal!", error, "error")
            })
        } else {
          setState({ ...state, loading: false })
        }
      })
    } else {
      setState({ ...state, loading: false })
      Swal.fire("Oops!", "Tolong isi semua data terlebih dahulu", "error")
    }
  }

  React.useEffect(() => {
    async function fetchUserData() {
      await axios
        .get(`${API.user}/users/${userCookies.id}`)
        .then(response => {
          if (response.data.data && response.data.data.length > 0) {
            setState({
              nama: response.data.data[0].nama,
              email: response.data.data[0].email,
              no_telepon: response.data.data[0].no_telepon,
              created_at: response.data.data[0].created_at,
              loading: false
            })
          } else {
            setState({ loading: false })
            console.log("no data")
            Swal.fire("Gagal!", "Anda belum mendaftarkan lahan", "error")
          }
        })
        .catch(error => {
          setState({ loading: false })
          console.log(error.response)
          // Swal.fire("Gagal!", error, "error")
        })
    }
    fetchUserData()
  }, [userCookies.id])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 style={{ color: "green" }}>Pengaturan Akunmu</h1>
          </Grid>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12} md={5}>
              <TextField
                name="email"
                onChange={handleChangeState}
                value={state.email}
                placeholder="Email"
                variant="outlined"
                helperText="Email"
                disabled={state.loading}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                name="role"
                label="Peran"
                variant="outlined"
                value="Customer"
                disabled
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12} md={5}>
              <TextField
                name="nama"
                onChange={handleChangeState}
                value={state.nama}
                placeholder="Nama"
                variant="outlined"
                helperText="Nama"
                disabled={state.loading}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                name="no_telepon"
                value={state.no_telepon}
                onChange={handleChangeState}
                placeholder="Nomor Telepon"
                variant="outlined"
                helperText="Nomor Telepon"
                disabled={state.loading}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12} md={5}>
              <TextField
                name="created_at"
                value={new Date(state.created_at).toLocaleString()}
                label="Bergabung pada"
                variant="outlined"
                disabled
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={4}>
              <Button
                color="inherit"
                variant="outlined"
                fullWidth
                style={{ color: "green", textTransform: "none" }}
                type="submit"
                disabled={state.loading}
              >
                {state.loading ? "Mohon tunggu..." : "Edit Akun"}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p>
              Lupa password?{" "}
              <MUILink
                component={Link}
                style={{ color: "green" }}
                to="/recover"
              >
                Reset
              </MUILink>
            </p>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
