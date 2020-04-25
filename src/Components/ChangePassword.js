import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
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

export default function LoginDosen(props) {
  const {
    match: { params }
  } = props

  const [state, setState] = React.useState({
    showPassword: false,
    loading: false
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

  const handleSubmit = e => {
    e.preventDefault()
    setState({ ...state, loading: true })
    if (state.password) {
      const payload = {
        password: state.password
      }
      axios
        .post(`${API.user}/change-password/${params.encId}`, payload)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            Swal.fire(
              "Berhasil!",
              "Kata sandi Anda berhasil diganti",
              "success"
            )
          } else {
            setState({ ...state, loading: false })
            Swal.fire("Gagal!", "error")
          }
        })
        .catch(error => {
          setState({ ...state, loading: false })
          Swal.fire("Gagal!", error, "error")
        })
    } else {
      setState({ ...state, loading: false })
      Swal.fire("Oops!", "Tolong isi password baru Anda", "error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 style={{ color: "green" }}>Ganti Password</h1>
            <h3>Masukkan kata sandi barumu di bawah ini</h3>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password Baru
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
                {state.loading ? "Mohon tunggu..." : "Ganti"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
