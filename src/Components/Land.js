import React from "react"
import { Link } from "react-router-dom"
import MUILink from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import MaterialTable from "material-table"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import CircularProgress from "@material-ui/core/CircularProgress"
import Swal from "sweetalert2"
import axios from "axios"
// import PropTypes from "prop-types"
import API from "../config"

const Land = props => {
  const {
    match: { params }
  } = props

  const [activities, setActivities] = React.useState([])
  const [harvests, setHarvests] = React.useState([])
  const [loadingData, setLoadingData] = React.useState(true)

  const columnsHarvest = [
    { title: "ID Panen", field: "id" },
    { title: "Deskripsi", field: "deskripsi" },
    { title: "Hasil (ton)", field: "hasil" },
    { title: "Profit (Rp)", field: "profit" },
    { title: "Waktu", field: "waktu" }
  ]
  const columnsActivity = [
    { title: "ID Aktivitas", field: "id" },
    { title: "Aktivitas", field: "aktivitas" },
    { title: "Deskripsi", field: "deskripsi" },
    { title: "Waktu", field: "waktu" }
  ]

  React.useEffect(() => {
    async function fetchDataHarvestsByLand() {
      await axios
        .get(`${API.land}/harvests/${params.landId}`)
        .then(response => {
          console.log(response)
          if (response.data.data && response.data.data.length > 0) {
            setLoadingData(false)
            setHarvests(response.data.data)
            // setState({ ...state, data: response.data.data })
          } else {
            console.log("no data")
            setLoadingData(false)
          }
        })
        .catch(error => {
          console.log(error)
          // Swal.fire("Gagal!", error, "error")
        })
    }
    async function fetchDataActivitiesByLand() {
      await axios
        .get(`${API.land}/activities/${params.landId}`)
        .then(response => {
          console.log(response)
          if (response.data.data && response.data.data.length > 0) {
            setLoadingData(false)
            setActivities(response.data.data)
            // setState({ ...state, data: response.data.data })
          } else {
            console.log("no data")
            setLoadingData(false)
          }
        })
        .catch(error => {
          console.log(error)
          // Swal.fire("Gagal!", error, "error")
        })
    }
    fetchDataHarvestsByLand()
    fetchDataActivitiesByLand()
  }, [params])

  return (
    <Grid container spacing={3} justify="center">
      <Grid
        container
        item
        spacing={3}
        alignItems="center"
        alignContent="center"
        justify="center"
        xs={12}
      >
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <MUILink component={Link} color="inherit" to="/manage">
              Manage
            </MUILink>
            <Typography color="textPrimary">
              Info Lahan {params.landId}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to={`/manage/create-harvest/${params.landId}`}
            color="inherit"
            variant="outlined"
            style={{ color: "green", textTransform: "none" }}
            fullWidth
          >
            Input Data Panen Baru
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            component={Link}
            to={`/manage/create-activity/${params.landId}`}
            color="inherit"
            variant="outlined"
            style={{ color: "green", textTransform: "none" }}
            fullWidth
          >
            Input Data Aktivitas Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      {loadingData ? (
        <Grid container justify="center" item xs={12}>
          <CircularProgress style={{ color: "green" }} />
        </Grid>
      ) : (
        ""
      )}
      <Grid container item spacing={3} xs={12}>
        <Grid item xs={12}>
          <MaterialTable
            title={
              loadingData
                ? "List Panen (Mohon tunggu, sedang mengambil data...)"
                : "List Panen"
            }
            columns={columnsHarvest}
            data={harvests}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete",
                onClick: (event, rowData) => {
                  event.preventDefault()
                  Swal.fire({
                    title: `Hapus data panen ${rowData.id}?`,
                    text: "Data panen akan dihapus secara permanen",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Hapus",
                    cancelButtonText: "Batal"
                  }).then(async result => {
                    if (result.value) {
                      await axios
                        .delete(`${API.land}/harvests/${rowData.id}`)
                        .then(response => {
                          if (response.status === 200) {
                            Swal.fire(
                              "Berhasil!",
                              "Data panen berhasil dihapus.",
                              "success"
                            )
                            setHarvests(
                              harvests.filter(el => {
                                return el.id !== rowData.id
                              })
                            )
                          } else {
                            Swal.fire("Gagal!", "error")
                          }
                        })
                        .catch(error => {
                          console.log(error)
                        })
                    }
                  })
                }
              }
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title={
              loadingData
                ? "List Aktivitas (Mohon tunggu, sedang mengambil data...)"
                : "List Aktivitas"
            }
            columns={columnsActivity}
            data={activities}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete",
                onClick: (event, rowData) => {
                  event.preventDefault()
                  Swal.fire({
                    title: `Hapus data aktivitas ${rowData.id}?`,
                    text: "Data aktivitas akan dihapus secara permanen",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Hapus",
                    cancelButtonText: "Batal"
                  }).then(async result => {
                    if (result.value) {
                      await axios
                        .delete(`${API.land}/activities/${rowData.id}`)
                        .then(response => {
                          if (response.status === 200) {
                            Swal.fire(
                              "Berhasil!",
                              "Data aktivitas berhasil dihapus.",
                              "success"
                            )
                            setActivities(
                              activities.filter(el => {
                                return el.id !== rowData.id
                              })
                            )
                          } else {
                            Swal.fire("Gagal!", "error")
                          }
                        })
                        .catch(error => {
                          console.log(error)
                        })
                    }
                  })
                }
              }
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

// Land.propTypes.shape({
//   match: PropTypes.object.isRequired
// })

export default Land
