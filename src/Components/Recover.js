import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MUILink from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Swal from "sweetalert2"
import axios from "axios"
import API from "../config"

export default function LoginDosen() {
  const [state, setState] = React.useState({
    loading: false
  })

  const handleChangeState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setState({ ...state, loading: true })
    if (state.email) {
      const payload = {
        email: state.email
      }
      axios
        .post(`${API.user}/recover`, payload)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            setState({ ...state, loading: false })
            Swal.fire(
              "Sent!",
              `Link untuk reset password berhasil dikirim ke ${state.email}`,
              "success"
            )
          } else {
            setState({ ...state, loading: false })
            Swal.fire("Gagal!", "error")
          }
        })
        .catch(error => {
          setState({ ...state, loading: false })
          if (error.response.data.message === "User not found") {
            Swal.fire("Gagal!", "Tidak ada user dengan email tersebut", "error")
          } else {
            Swal.fire("Gagal!", error, "error")
          }
        })
    } else {
      setState({ ...state, loading: false })
      Swal.fire("Oops!", "Tolong isi email anda", "error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 style={{ color: "green" }}>Lupa Password</h1>
            <h3>
              Santuy! Kami akan mengirimkan email untuk membuat kata sandi baru
            </h3>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={5}>
              <TextField
                name="email"
                onChange={handleChangeState}
                label="Email"
                variant="outlined"
                required
                fullWidth
                helperText="Masukkan email akunmu"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={5}>
              <Button
                color="inherit"
                variant="outlined"
                fullWidth
                style={{ color: "green", textTransform: "none" }}
                type="submit"
                disabled={state.loading}
              >
                {state.loading ? "Mohon tunggu..." : "Kirim"}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p>
              Tidak jadi lupa?{" "}
              <MUILink component={Link} style={{ color: "green" }} to="/login">
                Login
              </MUILink>
            </p>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
