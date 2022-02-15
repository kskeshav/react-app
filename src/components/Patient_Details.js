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

const formSchema = yup.object().shape({
  Name: yup.string().required(),
  PatientId: yup.string().required(),
  Age: yup.number().integer().required(),
  Gender: yup.string().required(),
  Education: yup.string().required(),
  Occupation: yup.string().required(),
  Languages: yup.string().required(),
  SocioeconomicStatus: yup.string().required(),
  Address: yup.string().required(),
  TelephoneNumber: yup.number().required(),
  InformantCaregiverName: yup.string().required(),
  RelationshipWithPatient: yup.string().required(),
  BloodGroup: yup.string().required(),
})

const defaultValues = {
  Name: "",
  PatientId: "",
  Age: 0,
  Gender: "",
  Education: "",
  Occupation: "",
  Languages: "",
  SocioeconomicStatus: "",
  Address: "",
  TelephoneNumber: "",
  InformantCaregiverName: "",
  RelationshipWithPatient: "",
  BloodGroup: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        console.log('Form is legit')
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
      <Grid container alignItems="center" direction="column" spacing="2">
        <Grid item>
          <TextField
            id="name-input"
            name="Name"
            label="Name"
            type="text"
            style = {{width: 300}}
            value={formValues.Name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="Age"
            label="Age"
            type="number"
            style = {{width: 300}}
            value={formValues.Age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="Gender"
              value={formValues.Gender}
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
            name="Education"
            label="Education"
            type="text"
            style = {{width: 300}}
            variant="outlined"
            value={formValues.Education}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Occupation"
            name="Occupation"
            label="Occupation"
            type="text"
            style = {{width: 300}}
            value={formValues.Occupation}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Languages"
            name="Languages"
            label="Languages"
            type="text"
            style = {{width: 300}}
            value={formValues.Languages}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="SocioeconomicStatus"
            name="SocioeconomicStatus"
            label="Socioeconomic Status"
            type="text"
            style = {{width: 300}}
            value={formValues.SocioeconomicStatus}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="Address"
            name="Address"
            label="Address"
            type="text"
            style = {{width: 300}}
            value={formValues.Address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="TelephoneNumber"
            name="TelephoneNumber"
            label="Telephone Number"
            type="number"
            style = {{width: 300}}
            value={formValues.TelephoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="InformantCaregiverName"
            name="InformantCaregiverName"
            label="Informant Caregiver Name"
            type="text"
            style = {{width: 300}}
            value={formValues.InformantCaregiverName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="RelationshipWithPatient"
            name="RelationshipWithPatient"
            label="Relationship with Patient"
            type="text"
            style = {{width: 300}}
            value={formValues.RelationshipWithPatient}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="BloodGroup"
            name="BloodGroup"
            label="Blood Group"
            type="text"
            style = {{width: 300}}
            value={formValues.BloodGroup}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default Patient_Details;