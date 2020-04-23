import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import API from "../config";
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ManageLand() {
	const classes = useStyles();

	const [role, setRole] = React.useState("");
  const [state, setState] = React.useState();
  const [bulkFile, setBulkFile] = React.useState();

  const handleFileUpload = (e) => {
      setBulkFile(e.target.files);
  };

  const handleInputChange = (e) => setState({
      ...state,
      [e.target.name]: e.target.value
  })

  function handleChangeRole(event) {
    setRole(event.target.value);
  }

  React.useEffect(() => {
     console.log('hehe')
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Buat baru?',
      text: 'Pastikan data sudah terisi dengan benar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Buat',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.value) {
        const payload = {
          user_id: state.user_id,
          email: state.email,
          name: state.name,
          role: role
        }
        await axios.post(`${API}/auth/register`, payload)
                    .then(() => {
                      Swal.fire(
                        'Tersimpan!',
                        'Akun berhasil dibuat.',
                        'success'
                      );
                    })
                    .catch(error => {
                      Swal.fire(
                        'Gagal!',
                        error,
                        'error'
                      );
                    });
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
        	<Grid item xs={12}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Link color="inherit" href="/kelola-akun">
                Kelola Akun
              </Link>
              <Typography color="textPrimary">Buat Akun Baru</Typography>
            </Breadcrumbs>
          </Grid>
        	<Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
  	        Buat Akun Baru
  	      </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Nama" name="name" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="NIP / ID" name="user_id" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="Email" name="email" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" required className={classes.formControl}>
    	        <InputLabel id="demo-simple-select-label">Peran</InputLabel>
    	        <Select
    	          labelId="demo-simple-select-label"
    	          value={role}
    	          onChange={handleChangeRole}
    	        >
                <MenuItem value="" disabled>
                  Pilih Peran
                </MenuItem>
    	          <MenuItem value={1}>Super admin</MenuItem>
    	          <MenuItem value={2}>Admin akademik</MenuItem>
    	          <MenuItem value={3}>Admin non-akademik</MenuItem>
    	          <MenuItem value={4}>Tenaga pendidik</MenuItem>
                <MenuItem value={5}>Dosen</MenuItem>
    	          <MenuItem value={6}>Kepala program studi</MenuItem>
    	        </Select>
    	      </FormControl>
          </Grid>
          <Grid item xs={12}>
          	<Grid container spacing={3}>
  		        <Grid item xs={12} md={2}>
    			      <Button variant="outlined" color="secondary" fullWidth href="/kelola-akun">
        					Batal
      				  </Button>
      				</Grid>
  		        <Grid item xs={12} md={3}>
    			      <Button variant="outlined" type="submit" color="primary" fullWidth>
        					Buat
      				  </Button>
      				</Grid>
      			</Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Buat Akun dari Bulk File (.csv)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <input
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="outlined" fullWidth component="span">
                      Pilih file
                    </Button>
                  </label>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" color="primary" fullWidth
                  onClick={async (e) => {
                    e.preventDefault();
                    if (bulkFile) {
                      const formData = new FormData();
                      formData.append('bulk_file', bulkFile[0]);
                      await axios.post(`${API}/upload/account`, formData, {
                                  headers: {
                                    'Content-Type': 'multipart/form-data'
                                  }
                              })
                              .then((response) => {
                                console.log(response);
                                Swal.fire(
                                  'Tersimpan!',
                                  'Akun berhasil dibuat.',
                                  'success'
                                );
                              })
                              .catch(error => {
                                Swal.fire(
                                  'Gagal!',
                                  error,
                                  'error'
                                );
                              });
                    }
                    else {
                      Swal.fire(
                          'Oops!',
                          'Pilih file .csv terlebih dahulu.',
                          'warning'
                      );
                    }
                  }}
                >
                  Buat Akun dari Bulk File
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
  	</div>
  );
}