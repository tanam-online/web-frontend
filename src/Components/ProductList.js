import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MUILink from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import PropTypes from "prop-types"
import axios from "axios"
import API from "../config"

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white // "#ffeb3b"
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

const tableStyles = () => ({
  table: {
    minWidth: 700
  }
})

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios
      .get(`${API}/get-all-products`)
      .then(response => {
        console.log(response)
        this.setState({ products: response.data.results })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { classes } = this.props
    const { state } = this
    return (
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Typography color="inherit" variant="h6">
            Product List
          </Typography>
          <Typography color="inherit" variant="subtitle1">
            Berikut adalah produk-produk{" "}
            <MUILink href="https://fabelio.com" target="_blank">
              fabelio.com
            </MUILink>{" "}
            yang sedang di-monitor
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Latest price</StyledTableCell>
                  <StyledTableCell align="right">Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.products.map(product => (
                  <StyledTableRow key={product.name}>
                    <StyledTableCell component="th" scope="row">
                      {product.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {`${product.description.slice(0, 50)}...`}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {product.latest_price}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        component={Link}
                        to={`/detail/${product.id}`}
                        variant="outlined"
                        style={{ textTransform: "none" }}
                      >
                        See Detail
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    )
  }
}

ProductList.propTypes = {
  classes: PropTypes.isRequired
}

export default withStyles(tableStyles)(ProductList)
