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
import { useCookies } from "react-cookie"
import API from "../config"

export default function LoginDosen() {
  const [state, setState] = React.useState({
    showPassword: false,
    loading: false
  })
  const [cookies, setCookie] = useCookies(["userCookie"])

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

  const history = useHistory()
  const handleSubmit = e => {
    e.preventDefault()
    setState({ ...state, loading: true })
    if (state.email) {
      if (state.password) {
        console.log(cookies)
        const payload = {
          email: state.email,
          password: state.password
        }
        axios
          .post(`${API.user}/login`, payload)
          .then(response => {
            console.log(response)
            if (response.data.data && response.data.data.length > 0) {
              setCookie("id", response.data.data[0].id, { path: "/" })
              setCookie("nama", response.data.data[0].nama, { path: "/" })
              setCookie("email", response.data.data[0].email, { path: "/" })
              setCookie("role", response.data.data[0].role, { path: "/" })
              setCookie("no_telepon", response.data.data[0].no_telepon, {
                path: "/"
              })
              setState({ ...state, loading: false })
              // document.cookie = `id=${response.data.data[0].id}; path=/`
              // document.cookie = `nama=${response.data.data[0].nama}; path=/`
              // document.cookie = `email=${response.data.data[0].email}; path=/`
              // document.cookie = `role=${response.data.data[0].role}; path=/`
              // document.cookie = `no_telepon=${response.data.data[0].no_telepon}; path=/`
              history.push("/manage")
            } else {
              setState({ ...state, loading: false })
              Swal.fire("Gagal!", "error")
            }
          })
          .catch(error => {
            setState({ ...state, loading: false })
            if (error.response.data.message === "Wrong password") {
              Swal.fire("Gagal!", "Email atau password salah", "error")
            } else {
              Swal.fire("Gagal!", error, "error")
            }
          })
      } else {
        setState({ ...state, loading: false })
        Swal.fire("Oops!", "Tolong isi password anda", "error")
      }
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
            <h1 style={{ color: "green" }}>Login ke Dashboard</h1>
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
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
                {state.loading ? "Mohon tunggu..." : "Masuk"}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p>
              Lupa kata sandi?{" "}
              <MUILink component={Link} style={{ color: "green" }} to="/reset">
                Reset
              </MUILink>
            </p>
            <p>
              Belum terdaftar?{" "}
              <MUILink
                component={Link}
                style={{ color: "green" }}
                to="/sign-up"
              >
                Daftar
              </MUILink>
            </p>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
