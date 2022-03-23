import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import { Grid, Select, MenuItem, Container, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const SearchPatient = (props) => {
    let history = useHistory();
    const [results, setResult] = useState([]);
    useEffect(()=>{
        props.get(props.id)
    },[])

    useEffect(() => {
      setResult(props.values) 
    }, [props.values]);

    const ViewConsultation = (result) => {
      props.set(result);
      return history.push("/viewConsultation");
    }
    const columns = 
    [
        { label: "Consultation Date",name:"consultationDate", options: { filterOptions: { fullWidth: false } ,
        customBodyRenderLite: (dataIndex) => {
            let val = (results[dataIndex].consultationDate);
            return val;
          } } 
        },
        {label:"Complaint",name:"compliant",options: { filterOptions: { fullWidth: false} ,
        customBodyRenderLite: (dataIndex) => {
            let val = results[dataIndex].complaint;
            return val;
          } } },
        {label:"Improvement Status", name:"improvementStatus",       
        options: { filterOptions: { fullWidth: false } ,
        customBodyRenderLite: (dataIndex) => {
            let val = results[dataIndex].improvementStatus;
            return val;
          } } 
        },
        {name: "Actions",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (<>
                        <Button variant="outlined" color="primary" onClick={() => ViewConsultation(results[dataIndex])}>View Full Consultation</Button>
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
        <MUIDataTable
        title={"Consultation History"}
        data={results}
        columns={columns}
        options={options}></MUIDataTable>
      </Container>
      </Box>
    </React.Fragment>
  )
}

export default SearchPatient