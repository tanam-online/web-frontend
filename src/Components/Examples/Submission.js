import React from "react"
import { Redirect } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import axios from "axios"
import API from "../../config"

function Submission() {
  const [id, setId] = React.useState()
  const [link, setLink] = React.useState()
  const [disabled, setDisabled] = React.useState(false)
  const [fireRedirect, setFireRedirect] = React.useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    setDisabled(true)
    axios
      .post(`${API}/create-submission`, { link })
      .then(response => {
        console.log(response)
        setId(response.data.product.id)
        setFireRedirect(true)
        setDisabled(false)
        setLink("")
      })
      .catch(error => {
        setDisabled(false)
        console.log(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Typography color="inherit" variant="h6">
            Submission
          </Typography>
          <Typography color="inherit" variant="subtitle1">
            Masukkan link product page yang valid dari{" "}
            <Link href="https://fabelio.com" target="_blank">
              fabelio.com
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Link product page"
            onChange={e => setLink(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            style={{ textTransform: "none" }}
            disabled={disabled}
          >
            Submit
          </Button>
          {fireRedirect && <Redirect to={`/detail/${id}`} />}
        </Grid>
      </Grid>
    </form>
  )
}

export default Submission
