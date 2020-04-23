import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import MaterialTable from "material-table"
import Button from "@material-ui/core/Button"
import Swal from "sweetalert2"
import axios from "axios"
import { useCookies } from "react-cookie"
import API from "../config"

const ManageLand = () => {
  const [userCookies] = useCookies(["userCookie"])
  const [lands, setLands] = React.useState([])
  const [loadingData, setLoadingData] = React.useState(true)
  const [state, setState] = React.useState({
    columns: [
      { title: "ID Lahan", field: "id" },
      { title: "Nama", field: "nama" },
      { title: "Deskripsi", field: "deskripsi" },
      { title: "Tanaman", field: "tanaman" },
      { title: "Dibuat pada", field: "created_at" }
    ]
    // data: [],
  })

  React.useEffect(() => {
    console.log(userCookies)
    async function fetchDataLandsByUser() {
      await axios
        .get(`${API.land}/lands/by-user/${userCookies.id}`)
        .then(response => {
          console.log(response)
          if (response.data.data && response.data.data.length > 0) {
            setLoadingData(false)
            setLands(response.data.data)
            // setState({ ...state, data: response.data.data })
          } else {
            console.log("no data")
            setLoadingData(false)
            Swal.fire("Gagal!", "Anda belum mendaftarkan lahan", "error")
          }
        })
        .catch(error => {
          console.log("error")
          Swal.fire("Gagal!", error, "error")
        })
    }
    fetchDataLandsByUser()
  }, [userCookies])

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
        <Grid item xs={12} md={9}>
          <Button
            component={Link}
            to="/manage-land/create-land"
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
      <Grid container item spacing={3} xs={12}>
        <Grid item xs={12}>
          <MaterialTable
            title={
              loadingData
                ? "List Lahan (Mohon tunggu, sedang mengambil data...)"
                : "List Lahan"
            }
            columns={state.columns}
            data={lands}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete",
                onClick: (event, rowData) => {
                  event.preventDefault()
                  Swal.fire({
                    title: `Hapus lahan ${rowData.nama}?`,
                    text: "Lahan akan dihapus secara permanen",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Hapus",
                    cancelButtonText: "Batal"
                  }).then(async result => {
                    if (result.value) {
                      await axios
                        .delete(`${API.land}/lands/${rowData.id}`)
                        .then(() => {
                          Swal.fire(
                            "Berhasil!",
                            "Lahan berhasil dihapus.",
                            "success"
                          )
                          setState({
                            ...state,
                            data: state.data.filter(el => {
                              return el.id !== rowData.id
                            })
                          })
                        })
                        .catch(error => {
                          Swal.fire("Gagal!", error, "error")
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

export default ManageLand
