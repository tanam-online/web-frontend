import React from "react"
import { withRouter } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import { Bar } from "react-chartjs-2"
import PropTypes from "prop-types"
import axios from "axios"
import API from "../../config"

const useStyles = () => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
})

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageNumber: 0,
      product: {},
      data: {
        labels: [],
        datasets: [
          {
            label: "Price every hour",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }
        ]
      }
    }
  }

  componentDidMount() {
    const { props } = this
    axios
      .get(`${API}/get-product-by-id/${props.match.params.id}`)
      .then(response => {
        this.setState({
          product: response.data.product
        })
        response.data.prices.map(price =>
          this.setState(prevState => ({
            data: {
              labels: [
                ...prevState.data.labels,
                new Date(price.time).toLocaleString()
              ],
              datasets: [
                {
                  label: "Price every hour",
                  data: [
                    ...prevState.data.datasets[0].data,
                    parseInt(price.price.match(/\d/g).join(""), 10)
                  ],
                  backgroundColor: [
                    ...prevState.data.datasets[0].backgroundColor,
                    "rgba(255, 99, 132, 0.2)"
                  ],
                  borderColor: [
                    ...prevState.data.datasets[0].borderColor,
                    "rgba(255, 99, 132, 1)"
                  ],
                  borderWidth: 1
                }
              ]
            }
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  showImage() {
    const { classes } = this.props
    const { state } = this
    console.log(state.data)
    if (state.imageNumber % 3 === 0) {
      return (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={state.product.image1}
            title="Image 1"
          />
        </Card>
      )
    }
    if (state.imageNumber % 3 === 1) {
      return (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={state.product.image2}
            title="Image 2"
          />
        </Card>
      )
    }
    if (state.imageNumber % 3 === 2) {
      return (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={state.product.image3}
            title="Image 3"
          />
        </Card>
      )
    }
    return ""
  }

  render() {
    const { state } = this
    return (
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={1}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() =>
                  this.setState({ imageNumber: state.imageNumber - 1 })
                }
              >
                <ArrowBackIos />
              </IconButton>
            </Grid>
            <Grid item xs={10} alignContent="center">
              {this.showImage()}
            </Grid>
            <Grid item xs={1}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() =>
                  this.setState({ imageNumber: state.imageNumber + 1 })
                }
              >
                <ArrowForwardIos />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography color="inherit" variant="h5">
                <Link
                  href="https://fabelio.com/ip/meja-makan-cessi-white-new.html"
                  target="_blank"
                >
                  {state.product.name}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="inherit" variant="h6">
                Current Price: {state.product.latest_price}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="inherit" variant="subtitle1">
                {state.product.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Bar
            data={state.data}
            width={100}
            height={50}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

Detail.propTypes = {
  classes: PropTypes.isRequired,
  match: PropTypes.isRequired
}

export default withRouter(withStyles(useStyles)(Detail))
