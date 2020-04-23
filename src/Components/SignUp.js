import React from "react"
import { Link, useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MUILink from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Swal from "sweetalert2"
import axios from "axios"
import API from "../config"

export default function LoginDosen() {
  const [state, setState] = React.useState({
    showPassword: false
  })

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChangeState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  let history = useHistory()
  const handleSubmit = e => {
    e.preventDefault()
    console.log(state)
    if (state.email && state.password && state.nama && state.no_telepon) {
      const payload = {
        email: state.email,
        password: state.password,
        nama: state.nama,
        no_telepon: state.no_telepon,
        role: 'customer'
      }
      axios
        .post(`${API.user}/users`, payload)
        .then(response => {
          console.log(response)
          if (response.data.data && response.data.data.length > 0) {
            history.push("/login")
          } else {
            Swal.fire("Gagal!", "Ada yang error nih", "error")
          }
        })
        .catch(error => {
          console.log(error)
          Swal.fire("Gagal!", error, "error")
        })
    } else {
      Swal.fire("Oops!", "Tolong isi semua data terlebih dahulu", "error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 style={{ color: "green" }}>Buat Akun Baru</h1>
          </Grid>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12} md={5}>
              <TextField
                name="email"
                onChange={handleChangeState}
                label="Email"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={state.showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12} md={5}>
              <TextField
                name="nama"
                onChange={handleChangeState}
                label="Nama"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                name="no_telepon"
                onChange={handleChangeState}
                label="Nomor Telepon"
                variant="outlined"
                required
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
              >
                Buat Akun
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p>
              Sudah punya akun?{" "}
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
