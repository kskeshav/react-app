import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Select, MenuItem, Card, CardContent, Typography, CardActions, Container, Box } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Link } from 'react-router-dom';
import Patient_Details from './Patient_Details';

const Search_Patient = () => {

    const fetchUrl = (id,field) => {
      return "http://localhost:8080/api/v1/patientdemographics/"+ field + "/" + id;
    }

    const [value, setValue] = useState("");

    const [field, setField] = useState('abhaId');

    const [results, setResult] = useState([]);
    
    const handleSubmit =  async (event) => {
      // Prevent form from submitting:
      event.preventDefault();
      let res = await axios.get(fetchUrl(value,field));
      console.log(res);
      setResult(res.data);
    }

    const ViewPatient = (result) => {
      console.log(result.abhaId);
      return <Link to={"/viewPatient/"+result.abhaId} > </Link>
    }
    const columns = 
    [
        { label: "Name",name:"name", options: { filterOptions: { fullWidth: false } ,
        customBodyRenderLite: (dataIndex) => {
            let val = (results[dataIndex].firstName + " " + results[dataIndex].lastName);
            return val;
          } } 
        },
        {label:"Age",name:"age",options: { filterOptions: { fullWidth: false} ,
        customBodyRenderLite: (dataIndex) => {
            let val = results[dataIndex].age;
            return val;
          } } },
        {label:"Contact Number", name:"phoneNo",       
        options: { filterOptions: { fullWidth: false } ,
        customBodyRenderLite: (dataIndex) => {
            let val = results[dataIndex].phoneNo;
            return val;
          } } 
        },
        {name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (<>
                        <Button variant="outlined" color="primary" onClick={() => ViewPatient(results[dataIndex])}>View Patient Details</Button>
                    </>
                    )}
            }
        }
    ];

    const options = {
        search: true,
        download: false,
        print: false,
        viewColumns: true,
        filter: true,
        filterType: "dropdown",
        responsive:"standard",
        selectableRows:"none",
      };
  return (
    <React.Fragment>
        <Box sx={{mt : 6}}>
        <Container maxWidth="md" className='searchPatient'>
        <Grid container direction="row" alignItems="center" style = {{marginBottom: "10px"}}
          justifyContent="center">
            <Grid item  xs={5}>
            <TextField variant="outlined" id="outlined-value" name = "value" label="Please enter value"  style = {{width: "90%"}} value = {value} onChange={(e) => setValue(e.target.value)}/>
            </Grid>
            <Grid item xs={4}>
            <Select
              style={{width:"150px"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={field}
              label="Select Field"
              style = {{width: "90%"}} 
              onChange={(e) => setField(e.target.value)}
              variant = "outlined"
            >
              <MenuItem value={'abhaId'}>Abha ID</MenuItem>
              <MenuItem value={'firstName'}>First Name</MenuItem>
              <MenuItem value={'contact'}>Phone Number</MenuItem>
            </Select>
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" size="large" color="primary" endIcon={<SearchIcon />}type="submit" onClick={handleSubmit}>
              Search
            </Button>
            
          </Grid>
        </Grid>
        <MUIDataTable
        title={"Patients List"}
        data={results}
        columns={columns}
        options={options}></MUIDataTable>
      </Container>
      </Box>
    </React.Fragment>
  )
}

export default Search_Patient