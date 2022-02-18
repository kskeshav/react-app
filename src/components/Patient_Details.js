import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import update from 'immutability-helper'
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required(),
  abhaId: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.string().required(),
  education: yup.string().required(),
  occupation: yup.string().required(),
  language: yup.string().required(),
  socioEconomicStatus: yup.string().required(),
  address: yup.string().required(),
  phoneNo: yup.number().required(),
  careGiverName: yup.string().required(),
  relationshipWithPatient: yup.string().required(),
  bloodGroup: yup.string().required(),
})

const defaultValues = {
  name: "",
  abhaId: 0,
  dob: "",
  gender: "",
  education: "",
  occupation: "",
  language: "",
  socioEconomicStatus: "",
  address: "",
  phoneNo: 0,
  careGiverName: "",
  relationshipWithPatient: "",
  bloodGroup: "",
// Consultation_List (List of Prior Consultation Ids)
};
const Patient_Details = () => {

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    website: false,
  })

  const [formValues, setFormValues] = useState(defaultValues);
  const [success, setSuccess] = useState(0);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formValues);
  // };

  const handleSubmit = React.useCallback(
    async (event) => {
      // Prevent form from submitting:
      event.preventDefault()

      // Check the schema if form is valid:
      const isFormValid = await formSchema.isValid(formValues, {
        abortEarly: false, // Prevent aborting validation after first error
      })

      if (isFormValid) {
        // If form is valid, continue submission.
        console.log(formValues)
        let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          }
        }
        // let resp = await axios.get("http://localhost:8080/api/v1/patientdemographics")
        // console.log(resp)
        let res = await axios.post("http://localhost:8080/api/v1/patientdemographics",formValues)
        console.log(res)
        if(res.data.name === formValues.name) setSuccess(1)
      } else {
        // If form is not valid, check which fields are incorrect:
        formSchema.validate(formValues, { abortEarly: false }).catch((err) => {
          // Collect all errors in { fieldName: boolean } format:
          const errors = err.inner.reduce((acc, error) => {
            return {
              ...acc,
              [error.path]: true,
            }
          }, {})

          // Update form errors state:
          setErrors((prevErrors) =>
            update(prevErrors, {
              $set: errors,
            })
          )
        })
      }
    },
    [formValues]
  )

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column" spacing={2} style = {{marginBottom: "20px"}}>
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            style = {{width: 300}}
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="AbhaId"
            name="abhaId"
            label="ABHA ID"
            type="number"
            style = {{width: 300}}
            value={formValues.abhaId===0?"":formValues.abhaId}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="date"
            name="dob"
            label="Date of Birth"
            type="date"
            value={formValues.dob}
            style = {{width: 300}}
            sx={{ width: 220 }}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="Education"
            name="education"
            label="Education"
            type="text"
            style = {{width: 300}}
            // variant="outlined"
            value={formValues.education}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Occupation"
            name="occupation"
            label="Occupation"
            type="text"
            style = {{width: 300}}
            value={formValues.occupation}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Languages"
            name="language"
            label="Languages"
            type="text"
            style = {{width: 300}}
            value={formValues.language}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="SocioeconomicStatus"
            name="socioEconomicStatus"
            label="Socioeconomic Status"
            type="text"
            style = {{width: 300}}
            value={formValues.socioEconomicStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Address"
            name="address"
            label="Address"
            type="text"
            style = {{width: 300}}
            value={formValues.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="TelephoneNumber"
            name="phoneNo"
            label="Telephone Number"
            type="number"
            style = {{width: 300}}
            value={formValues.phoneNo===0?"":formValues.phoneNo}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="InformantCaregiverName"
            name="careGiverName"
            label="Informant Caregiver Name"
            type="text"
            style = {{width: 300}}
            value={formValues.careGiverName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="RelationshipWithPatient"
            name="relationshipWithPatient"
            label="Relationship with Patient"
            type="text"
            style = {{width: 300}}
            value={formValues.relationshipWithPatient}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="BloodGroup"
            name="bloodGroup"
            label="Blood Group"
            type="text"
            style = {{width: 300}}
            value={formValues.bloodGroup}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        {success===0?<></>:<div>
            Added Patient details!
          </div>}
      </Grid>
    </form>
  );
};
export default Patient_Details;