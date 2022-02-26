import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Select, MenuItem, Card, CardContent, Typography, CardActions, Container, Box } from '@material-ui/core';
import axios from "axios";

const Search_Patient = () => {

    const fetchUrl = (id,field) => {
      return "http://localhost:8080/api/v1/patientdemographics/"+ field + "/" + id;
    }

    const [value, setValue] = useState("");

    const [field, setField] = useState('abhaId');

    const [results, setResult] = useState([]);

    const [success, setSuccess] = useState(1);
    
    const handleSubmit =  async (event) => {
      // Prevent form from submitting:
      event.preventDefault();
      let res = await axios.get(fetchUrl(value,field));
      console.log(res);
      setResult(res.data);
      if(res.data.length!==0 && res.status===200){
        setSuccess(1);
      }
      else if(res.data.length===0 && res.status===200){
        setSuccess(0);
      }
    }
  return (
    <React.Fragment>
        <Box sx={{mt : 6}}>
        <Container maxWidth="md" className='searchPatient'>
        <Grid container alignItems="center" direction="column"  >
            <Grid item style={{marginBottom:"10px"}}>
            <TextField id="outlined-value" name = "value" label="Please enter value"  style = {{width: 300}} value = {value} onChange={(e) => setValue(e.target.value)}/>
            </Grid>
            <Grid item>
            <Select
              style={{margin:"10px", width:"150px"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={field}
              label="Select Field"
              onChange={(e) => setField(e.target.value)}
            >
              <MenuItem value={'abhaId'}>Abha ID</MenuItem>
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'contact'}>Phone Number</MenuItem>
              {/* <MenuItem value={'nameandcontact'}>Name and Contact number</MenuItem> */}
            </Select>
            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            Submit
            </Button>
        </Grid>
        </Grid>
        {success===1?
        <Grid container direction="column" alignItems='stretch'>
        {results.map((result) => {return (
          <Grid item key={result.id} style={{marginBottom:"10px"}}>
          <Card sx={{ minWidth: 275 }} variant="outlined" >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Name : {result.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Age : {result.age}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Contact Details  : {result.phoneNo}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Past History</Button>
          </CardActions>
          </Card>
          </Grid>
        )})}
        </Grid>
        : <Box sx={{mt : 10}}>
          <Grid container direction="column" alignItems='center' >
            <Grid item>
              <Typography color="text.secondary" gutterBottom variant='h3'>
                No results Found!
            </Typography>
            </Grid>
          </Grid>
          </Box>}
      </Container>
      </Box>
    </React.Fragment>
  )
}

export default Search_Patient