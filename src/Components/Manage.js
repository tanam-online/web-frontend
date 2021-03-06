import React from "react"
import { Link, useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MaterialTable from "material-table"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Swal from "sweetalert2"
import axios from "axios"
import { useCookies } from "react-cookie"
import API from "../config"

const Manage = () => {
  const [userCookies] = useCookies(["userCookie"])
  const [lands, setLands] = React.useState([])
  const [loadingData, setLoadingData] = React.useState(true)
  const columns = [
    { title: "ID Lahan", field: "id" },
    { title: "Nama", field: "nama" },
    { title: "Deskripsi", field: "deskripsi" },
    { title: "Tanaman", field: "tanaman" },
    { title: "Dibuat pada", field: "created_at" }
  ]

  React.useEffect(() => {
    console.log(userCookies)
    async function fetchDataLandsByUser() {
      await axios
        .get(`${API.land}/lands/by-user/${userCookies.id}`)
        .then(response => {
          console.log(response)
          if (response.data.data && response.data.data.length > 0) {
            // response.data.data.forEach((item => {
            //   item.created_at = new Date(item.created_at).toLocaleString()
            // })
            response.data.data.forEach((item, index) => {
              response.data.data[index].created_at = new Date(
                item.created_at
              ).toLocaleString()
            })
            setLoadingData(false)
            setLands(response.data.data)
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
    fetchDataLandsByUser()
  }, [userCookies])

  const history = useHistory()

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
        <Grid item xs={12} md={3}>
          <h1 style={{ color: "green" }}>Kelola Lahanmu</h1>
        </Grid>
        <Grid item xs={12} md={9}>
          <Button
            component={Link}
            to="/manage/create-land"
            color="inherit"
            variant="outlined"
            style={{ color: "green", textTransform: "none" }}
            fullWidth
          >
            Buat Lahan Baru
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
                ? "List Lahan (Mohon tunggu, sedang mengambil data...)"
                : "List Lahan"
            }
            columns={columns}
            data={lands}
            actions={[
              {
                icon: "visibility",
                tooltip: "Info Lebih Lanjut",
                onClick: (event, rowData) => {
                  history.push(`/land/${rowData.id}`)
                }
              },
              {
                icon: "delete",
                tooltip: "Delete",
                onClick: (event, rowData) => {
                  event.preventDefault()
                  Swal.fire({
                    title: `Hapus lahan ${rowData.nama}?`,
                    text: "Lahan dan data terkait akan dihapus secara permanen",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Hapus",
                    cancelButtonText: "Batal"
                  }).then(async result => {
                    if (result.value) {
                      await axios
                        .delete(`${API.land}/lands/${rowData.id}`)
                        .then(response => {
                          if (response.status === 200) {
                            Swal.fire(
                              "Berhasil!",
                              "Lahan berhasil dihapus.",
                              "success"
                            )
                            setLands(
                              lands.filter(el => {
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

export default Manage
